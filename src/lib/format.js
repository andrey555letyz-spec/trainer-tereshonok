export function formatPercent(part, total) {
  if (!total) return "0%";
  return Math.round((part / total) * 100) + "%";
}
export function formatTime(seconds) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}