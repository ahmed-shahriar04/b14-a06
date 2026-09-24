import Image from "next/image";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-4">
      <div className="bg-[#14161b] border border-[#22252e] rounded-3xl p-6 sm:p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12 overflow-hidden relative">
        <div className="flex-1 w-full lg:max-w-2xl space-y-4 sm:space-y-5 z-10 text-left">
          <span className="text-[#ccff00] text-[11px] sm:text-xs font-bold tracking-widest uppercase block">
            WORKOUT LIBRARY
          </span>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1] uppercase">
            <span className="block md:whitespace-nowrap">
              TRAIN WITH INTENT. LOG
            </span>
            <span className="block mt-1">EVERY SET.</span>
          </h1>

          <p className="text-gray-400 text-xs sm:text-sm lg:text-base max-w-lg leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="pt-2">
            <a
              href="#library"
              className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs tracking-wider px-6 py-3.5 rounded-xl uppercase transition shadow-lg shadow-[#ccff00]/10 cursor-pointer group"
            >
              <span>BROWSE WORKOUTS</span>
              <ArrowDownRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center md:justify-end w-full">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-[380px] lg:h-[380px] shrink-0">
            <Image
              src="/banner.png"
              alt="Athlete Illustration"
              fill
              sizes="(max-width: 768px) 224px, 380px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
