export function formatDuration(duration) {
  if (duration === undefined || duration === null || duration === "") return "N/A";
  const str = String(duration).trim();
  if (str.toLowerCase().includes("min")) return str;
  return `${str} min`;
}

export function formatCalories(calories) {
  if (calories === undefined || calories === null || calories === "") return "N/A";
  const str = String(calories).trim();
  if (str.toLowerCase().includes("kcal")) return str;
  return `${str} kcal`;
}

export function parseNumber(val) {
  if (val === undefined || val === null || val === "") return 0;
  const match = String(val).match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}
