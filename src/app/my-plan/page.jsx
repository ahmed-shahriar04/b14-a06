"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Check, X, ChevronDown, ArrowRight } from "lucide-react";
import { useWorkout } from "../../context/WorkoutContext";
import {
  formatDuration,
  formatCalories,
  parseNumber,
} from "../../utils/format";

export default function MyPlanPage() {
  const {
    todaysPlan,
    savedWorkouts,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useWorkout();

  const [activeTab, setActiveTab] = useState("today");
  const [sortBy, setSortBy] = useState("Duration");

  const currentList = activeTab === "today" ? todaysPlan : savedWorkouts;

  const totalExercises = todaysPlan.length;

  const totalMinutes = useMemo(() => {
    return todaysPlan.reduce(
      (acc, item) => acc + parseNumber(item.duration),
      0
    );
  }, [todaysPlan]);

  const totalCalories = useMemo(() => {
    return todaysPlan.reduce(
      (acc, item) => acc + parseNumber(item.caloriesBurned ?? item.calories),
      0
    );
  }, [todaysPlan]);

  const sortedList = useMemo(() => {
    const list = [...currentList];
    return list.sort((a, b) => {
      if (sortBy === "Duration") {
        return parseNumber(b.duration) - parseNumber(a.duration);
      }
      if (sortBy === "Calories") {
        const calA = parseNumber(a.caloriesBurned ?? a.calories);
        const calB = parseNumber(b.caloriesBurned ?? b.calories);
        return calB - calA;
      }
      if (sortBy === "Rating") {
        return parseNumber(b.rating) - parseNumber(a.rating);
      }
      return 0;
    });
  }, [currentList, sortBy]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 sm:py-10 lg:py-14 space-y-6 sm:space-y-8 font-(family-name:--font-inter)">
      <div className="space-y-1.5">
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm font-normal">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="bg-[#12141a] border border-[#1d2028] rounded-3xl p-5 sm:p-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-0 text-center sm:text-left">
          <div className="sm:pr-10 relative">
            <span className="text-gray-400 text-[11px] sm:text-xs font-normal block">Exercises</span>
            <p className="font-heading text-3xl sm:text-5xl font-extrabold text-[#ccff00] mt-1.5 sm:mt-3 leading-none">
              {totalExercises}
            </p>
            <div className="hidden sm:block absolute right-0 top-2 bottom-2 w-px bg-[#1d2028]" />
          </div>

          <div className="sm:px-10 relative">
            <span className="text-gray-400 text-[11px] sm:text-xs font-normal block">Minutes</span>
            <p className="font-heading text-3xl sm:text-5xl font-extrabold text-white mt-1.5 sm:mt-3 leading-none">
              {totalMinutes}
            </p>
            <div className="hidden sm:block absolute right-0 top-2 bottom-2 w-px bg-[#1d2028]" />
          </div>

          <div className="sm:pl-10">
            <span className="text-gray-400 text-[11px] sm:text-xs font-normal block">Calories</span>
            <p className="font-heading text-3xl sm:text-5xl font-extrabold text-white mt-1.5 sm:mt-3 leading-none">
              {totalCalories}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
        <div className="inline-flex items-center bg-[#101217] p-1 rounded-2xl border border-[#1d2028]">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-4 sm:px-5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === "today"
                ? "bg-[#1c202a] text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 sm:px-5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === "saved"
                ? "bg-[#1c202a] text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2.5 text-xs">
          <span className="text-gray-400 font-medium">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#12141a] border border-[#1d2028] text-white text-xs px-4 py-2 pr-9 rounded-xl outline-none hover:border-[#383c48] focus:border-[#ccff00] transition cursor-pointer font-medium"
            >
              <option value="Duration">Duration</option>
              <option value="Calories">Calories</option>
              <option value="Rating">Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <div className="border border-dashed bg-[#111317] border-[#1d2028] rounded-3xl py-24 px-6 text-center space-y-3.5">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
            NOTHING HERE YET
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm max-w-sm mx-auto">
            Browse the library and add a lift to get today moving.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs tracking-wider px-6 py-3 rounded-3xl uppercase transition shadow-md shadow-[#ccff00]/10 group"
            >
              <span>Go to workouts</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((item) => (
            <div
              key={item.id}
              className={`bg-[#12141a] border ${
                item.done ? "border-green-500/30 opacity-75" : "border-[#1d2028]"
              } hover:border-[#272b36] rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-5 transition-all shadow-md relative`}
            >
              <button
                onClick={() =>
                  activeTab === "today"
                    ? removeFromPlan(item.id)
                    : removeFromSaved(item.id)
                }
                className="absolute top-4 right-4 md:hidden w-7 h-7 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/25 transition cursor-pointer z-10"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-start sm:items-center gap-3.5 sm:gap-6 min-w-0 pr-8 md:pr-0">
                <div className="relative w-28 h-24 sm:w-44 sm:h-28 rounded-2xl overflow-hidden bg-[#1c1f26] shrink-0 border border-[#1d2028]">
                  <Image
                    src={item.image || "/banner.png"}
                    alt={item.name || item.title}
                    fill
                    sizes="(max-width: 640px) 112px, 176px"
                    className="object-cover object-top"
                  />
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <h4 className="font-heading text-lg sm:text-xl font-bold text-white uppercase tracking-wide truncate">
                    {item.name || item.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-normal truncate">
                    {item.equipment}
                  </p>

                  <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-4 text-xs text-gray-300 pt-1 font-medium">
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                      <span>{formatDuration(item.duration)}</span>
                    </span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Flame className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                      <span>{formatCalories(item.caloriesBurned ?? item.calories)}</span>
                    </span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Star className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                      <span>{item.rating}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t border-[#1d2028] md:border-t-0 shrink-0">
                <Link
                  href={`/workout/${item.id}`}
                  className="flex-1 md:flex-initial text-center px-4 sm:px-5 py-2.5 border border-[#232733] hover:border-gray-500 text-gray-200 text-xs font-semibold rounded-full transition whitespace-nowrap"
                >
                  View Details
                </Link>

                {activeTab === "today" && (
                  <button
                    onClick={() => markAsDone(item.id)}
                    className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 text-xs font-bold rounded-full transition cursor-pointer whitespace-nowrap ${
                      item.done
                        ? "bg-green-500 text-black hover:bg-green-600"
                        : "bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-sm shadow-[#ccff00]/10"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{item.done ? "Done" : "Mark as Done"}</span>
                  </button>
                )}

                <button
                  onClick={() =>
                    activeTab === "today"
                      ? removeFromPlan(item.id)
                      : removeFromSaved(item.id)
                  }
                  className="hidden md:flex w-8 h-8 items-center justify-center text-gray-500 hover:text-red-400 transition cursor-pointer ml-1 shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}