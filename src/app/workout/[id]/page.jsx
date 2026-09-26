import Image from "next/image";
import { notFound } from "next/navigation";
import DetailsActions from "../../../components/DetailsActions";
import { formatDuration, formatCalories } from "../../../utils/format";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const workouts = Array.isArray(json) ? json : json.data || [];
    return workouts.map((w) => ({
      id: String(w.id),
    }));
  } catch (e) {
    return [];
  }
}

async function getWorkoutDetails(id) {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    const workout = data.data || data;

    if (!workout || (!workout.name && !workout.title)) {
      return null;
    }

    return workout;
  } catch (e) {
    return null;
  }
}

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;
  const numId = Number(id);

  if (isNaN(numId) || numId > 12 || numId < 1) {
    notFound();
  }

  const workout = await getWorkoutDetails(id);

  if (!workout) {
    notFound();
  }

  const categories = workout.muscleGroups || workout.category || [];

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: formatDuration(workout.duration) },
    {
      label: "CALORIES",
      value: formatCalories(workout.caloriesBurned ?? workout.calories),
    },
    { label: "RATING", value: workout.rating },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-10 lg:py-16 font-(family-name:--font-inter)">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="relative w-full aspect-4/5 rounded-3xl overflow-hidden bg-[#14161b] border border-[#1f222b] shadow-2xl">
          <Image
            src={workout.image || "/banner.png"}
            alt={workout.name || workout.title || "Workout Details"}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>

        <div className="space-y-7">
          <div className="space-y-3">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
              {workout.name || workout.title}
            </h1>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl">
              {workout.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {categories.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#ccff00] text-black text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#151922]/90 border border-[#232834] rounded-2xl overflow-hidden divide-y divide-[#1a1f2c] shadow-xl">
            {specs.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-6 py-4 transition-colors hover:bg-[#131722]/50"
              >
                <span className="text-[#7e8596] font-bold uppercase tracking-wider text-[11.5px] select-none">
                  {item.label}
                </span>
                <span className="text-[#d8dce6] font-medium text-sm text-right">
                  {item.value || "N/A"}
                </span>
              </div>
            ))}
          </div>

          {workout.instructions && workout.instructions.length > 0 && (
            <div className="space-y-4 pt-2">
              <h2 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
                INSTRUCTIONS
              </h2>
              <ol className="space-y-3.5 text-base sm:text-base text-gray-300">
                {workout.instructions.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 leading-relaxed"
                  >
                    <span className="text-[#ccff00] font-bold select-none text-base">
                      {index + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="pt-2">
            <DetailsActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}
