import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#1c1f26] bg-[#0e0f12] py-6 px-4 md:px-12 text-xs text-gray-500 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              fill
              sizes="24px"
              className="object-contain"
            />
          </div>
          <span className="font-heading font-bold text-gray-300 tracking-wider">
            FITLOG
          </span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
