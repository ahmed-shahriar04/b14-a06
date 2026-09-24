export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-[#22252e] border-t-[#ccff00] rounded-full animate-spin"></div>
      <p className="text-gray-400 text-sm tracking-wider uppercase font-semibold">
        Loading workouts...
      </p>
    </div>
  );
}
