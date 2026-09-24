"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useWorkout } from "../context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { todaysPlan, savedWorkouts } = useWorkout();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isPlanActive = pathname === "/my-plan";

  const planCount = mounted ? todaysPlan.length : 0;
  const savedCount = mounted ? savedWorkouts.length : 0;

  return (
    <header className="sticky top-0 z-50 bg-[#0a0b0d] border-b border-[#16181d] px-4 md:px-12 py-3 font-(family-name:--font-inter)">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between relative">
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-white p-1 cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="relative w-6 h-6 sm:w-7 sm:h-7">
              <Image
                src="/logo.png"
                alt="FitLog Logo"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-(family-name:--font-oswald) text-lg sm:text-xl font-extrabold tracking-wider text-white">
              FITLOG
            </span>
          </Link>
        </div>

        <div className="w-6 md:hidden" />

        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              isWorkoutActive
                ? "bg-[#1c2410] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              isPlanActive
                ? "bg-[#1c2410] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium shrink-0">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition group"
          >
            <span className="text-gray-400 group-hover:text-white transition">Plan</span>
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 bg-[#ccff00] text-black font-extrabold text-[11px] rounded-full leading-none">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition group"
          >
            <span className="text-gray-400 group-hover:text-white transition">Saved</span>
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 border border-[#2a2d36] text-gray-300 font-bold text-[11px] rounded-full leading-none group-hover:border-gray-500">
              {savedCount}
            </span>
          </Link>
        </div>

      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[#16181d] mt-3 pt-4 pb-3 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                isWorkoutActive
                  ? "bg-[#1c2410] text-[#ccff00]"
                  : "text-gray-300 hover:bg-[#16181d]"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                isPlanActive
                  ? "bg-[#1c2410] text-[#ccff00]"
                  : "text-gray-300 hover:bg-[#16181d]"
              }`}
            >
              My Plan
            </Link>
          </div>

          <div className="flex items-center justify-between px-4 pt-3 border-t border-[#16181d] text-sm font-medium">
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-gray-300"
            >
              <span>Plan</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 bg-[#ccff00] text-black font-extrabold text-[11px] rounded-full leading-none">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-gray-300"
            >
              <span>Saved</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 border border-[#2a2d36] text-gray-300 font-bold text-[11px] rounded-full leading-none">
                {savedCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}