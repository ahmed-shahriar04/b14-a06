import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="relative w-28 h-28">
        <Image
          src="/logo.png"
          alt="FitLog"
          fill
          sizes="112px"
          className="object-contain opacity-40 grayscale"
        />
      </div>

      <div className="space-y-2">
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-widest font-heading">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-300">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-xs md:text-sm max-w-sm mx-auto">
          The lift or page you are looking for has been moved or does not exist.
        </p>
      </div>

      <Link
        href="/"
        className="inline-block bg-[#ccff00] text-black font-semibold text-xs tracking-wider px-6 py-3 rounded-lg uppercase hover:opacity-90 transition"
      >
        Back to workouts
      </Link>
    </div>
  );
}
