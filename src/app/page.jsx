import Hero from "../components/Hero";
import LibrarySection from "../components/LibrarySection";

export const dynamic = "force-dynamic";

async function getWorkouts() {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch workouts: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
}

export default async function HomePage() {
  const data = await getWorkouts();
  const workouts = Array.isArray(data) ? data : data.data || [];

  return (
    <div>
      <Hero />
      <LibrarySection initialWorkouts={workouts} />
    </div>
  );
}
