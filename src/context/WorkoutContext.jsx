"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [todaysPlan, setTodaysPlan] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_today_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setTodaysPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
    } catch (e) {
      console.error("Failed to load workouts from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("fitlog_today_plan", JSON.stringify(todaysPlan));
        localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
      } catch (e) {
        console.error("Failed to save workouts to localStorage", e);
      }
    }
  }, [todaysPlan, savedWorkouts, isLoaded]);

  const addToTodaysPlan = (workout) => {
    if (todaysPlan.some((item) => item.id === workout.id)) {
      toast.error("Already added to today's plan!");
      return;
    }
    if (todaysPlan.length >= 5) {
      toast.error("Maximum 5 lifts limit reached for today!");
      return;
    }
    setTodaysPlan((prev) => [...prev, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  };

  const addToSaved = (workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      toast.error("Already in your saved list!");
      return;
    }
    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id) => {
    setTodaysPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Workout removed from today's plan");
  };

  const removeFromSaved = (id) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    toast.success("Workout removed from saved list");
  };

  const markAsDone = (id) => {
    let wasDone = false;
    setTodaysPlan((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          wasDone = !item.done;
          return { ...item, done: !item.done };
        }
        return item;
      })
    );
    if (wasDone) {
      toast.success("Workout marked as done!");
    } else {
      toast("Workout marked as incomplete", { icon: "↩️" });
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        todaysPlan,
        savedWorkouts,
        isLoaded,
        addToTodaysPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#181a20",
            color: "#ffffff",
            border: "1px solid #2a2d36",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 500,
            padding: "10px 16px",
          },
          success: {
            iconTheme: {
              primary: "#ccff00",
              secondary: "#000000",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </WorkoutContext.Provider>
  );
}

export const useWorkout = () => useContext(WorkoutContext);