"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import WorkoutCard from "./WorkoutCard";
import { parseNumber } from "../utils/format";

export default function LibrarySection({ initialWorkouts = [] }) {
  const [sortBy, setSortBy] = useState("Duration");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkouts = useMemo(() => {
    return initialWorkouts.filter((workout) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      const name = (workout.name || workout.title || "").toLowerCase();
      const equipment = (workout.equipment || "").toLowerCase();
      const muscleGroups = (workout.muscleGroups || workout.category || [])
        .map((m) => String(m).toLowerCase())
        .join(" ");
      return (
        name.includes(q) || equipment.includes(q) || muscleGroups.includes(q)
      );
    });
  }, [initialWorkouts, searchQuery]);

  const sortedWorkouts = useMemo(() => {
    const list = [...filteredWorkouts];
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
  }, [filteredWorkouts, sortBy]);

  return (
    <section
      id="library"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 py-14 scroll-mt-20"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide uppercase font-heading">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lifts..."
              className="bg-[#14161b] border border-[#22252e] text-white text-xs pl-8 pr-3 py-2 rounded-xl outline-none hover:border-[#383c48] focus:border-[#ccff00] transition w-36 sm:w-48 placeholder:text-gray-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 font-medium">Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#14161b] border border-[#22252e] text-white text-xs px-3.5 py-2 pr-8 rounded-xl outline-none hover:border-[#383c48] focus:border-[#ccff00] transition cursor-pointer font-medium"
              >
                <option value="Duration">Duration</option>
                <option value="Calories">Calories</option>
                <option value="Rating">Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {sortedWorkouts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[#22252e] rounded-2xl text-gray-400">
          <p className="text-sm">
            No lifts matched &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs text-[#ccff00] underline cursor-pointer"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
