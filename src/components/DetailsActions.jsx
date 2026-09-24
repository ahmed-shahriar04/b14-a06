"use client";

import { CalendarPlus, Bookmark, Check, Plus } from "lucide-react";
import { useWorkout } from "../context/WorkoutContext";

export default function DetailsActions({ workout }) {
  const { todaysPlan, savedWorkouts, addToTodaysPlan, addToSaved } =
    useWorkout();

  const isAlreadyInPlan = todaysPlan.some((item) => item.id === workout.id);
  const isAlreadyInSaved = savedWorkouts.some((item) => item.id === workout.id);
  const isPlanFull = todaysPlan.length >= 5;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
      <button
        onClick={() => addToTodaysPlan(workout)}
        disabled={isAlreadyInPlan || isPlanFull}
        className={`w-full sm:w-auto flex items-center justify-center gap-2 font-medium text-[15px] px-6 py-3 rounded-xl transition cursor-pointer shadow-md shadow-[#ccff00]/10 ${
          isAlreadyInPlan
            ? "bg-[#242918] text-[#ccff00] border border-[#ccff00]/30 cursor-not-allowed opacity-80"
            : isPlanFull
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-[#ccff00] text-black hover:bg-[#b8e600] active:scale-[0.98]"
        }`}
      >
        {isAlreadyInPlan ? (
          <>
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>In Today&apos;s Plan</span>
          </>
        ) : (
          <>
            <CalendarPlus className="w-4 h-4" />
            <span>
              {isPlanFull ? "Plan Limit Reached (5/5)" : "Add to today's plan"}
            </span>
          </>
        )}
      </button>

      <button
        onClick={() => addToSaved(workout)}
        disabled={isAlreadyInSaved}
        className={`w-full sm:w-auto flex items-center justify-center gap-2 font-medium text-[15px] px-6 py-3 rounded-xl transition border cursor-pointer ${
          isAlreadyInSaved
            ? "bg-[#1c1f26] border-[#383c48] text-gray-400 cursor-not-allowed opacity-75"
            : "bg-transparent hover:bg-[#1a1d24] border-[#2a2d36] text-white hover:border-gray-500 active:scale-[0.98]"
        }`}
      >
        {isAlreadyInSaved ? (
          <>
            <Check className="w-4 h-4 text-[#ccff00] stroke-[2.5]" />
            <span>Saved in List</span>
          </>
        ) : (
          <>
            <Bookmark className="w-4 h-4 text-gray-400" />
            <span>Save for later</span>
          </>
        )}
      </button>
    </div>
  );
}
