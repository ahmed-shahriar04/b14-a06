"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { formatDuration, formatCalories } from "../utils/format";

export default function WorkoutCard({ workout }) {
  const [imgSrc, setImgSrc] = useState(workout.image || "/banner.png");
  const categories = workout.muscleGroups || workout.category || [];
  const durationText = formatDuration(workout.duration);
  const caloriesText = formatCalories(workout.caloriesBurned ?? workout.calories);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="bg-[#14161b] border border-[#1f222a] hover:border-[#ccff00]/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group h-full shadow-lg hover:shadow-2xl hover:shadow-[#ccff00]/5"
    >
      <div className="relative w-full aspect-16/10 bg-[#1c1f26] overflow-hidden">
        <Image
          src={imgSrc}
          alt={workout.name || workout.title || "Workout"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={() => setImgSrc("/banner.png")}
        />
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
            {categories.map((tag, index) => (
              <span
                key={index}
                className="bg-[#ccff00] text-black text-[10px] sm:text-[11px] font-black px-2.5 sm:px-3 py-1 rounded-full tracking-wider uppercase inline-flex items-center justify-center leading-none select-none shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-(family-name:--font-oswald) text-lg sm:text-xl font-black text-white uppercase tracking-wide group-hover:text-[#ccff00] transition-colors line-clamp-1 leading-tight">
            {workout.name || workout.title}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-1 font-medium">
            {workout.equipment}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-300 border-t border-[#1f222a] pt-3.5 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
            <span>{durationText}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
            <span>{caloriesText}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}