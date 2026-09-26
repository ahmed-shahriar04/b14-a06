import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#1c1f26] bg-[#0e0f12] py-8 px-4 md:px-12 text-sm text-gray-400 mt-auto font-(family-name:--font-inter)">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              fill
              sizes="28px"
              className="object-contain"
            />
          </div>
          <span className="font-(family-name:--font-oswald) text-xl font-extrabold text-white tracking-wider">
            FITLOG
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-400">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}