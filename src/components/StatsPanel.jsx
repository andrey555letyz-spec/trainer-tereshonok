import { useMemo } from "react";
import { useProgressContext } from "../context/ProgressContext";
import { formatPercent } from "../lib/format";
import ProgressBar from "./ProgressBar";

export default function StatsPanel({ total }) {
  const { progress } = useProgressContext();

  // useMemo для статистики
  const stats = useMemo(() => {
    const attempts = progress.attempts;
    const solvedIds = new Set(attempts.filter(a => a.ok).map(a => a.taskId));
    return {
      totalAttempts: attempts.length,
      solvedCount: solvedIds.size,
      percent: (solvedIds.size / total) * 100 || 0
    };
  }, [progress.attempts, total]);

  return (
    <div>
      <p>Решено: <b>{stats.solvedCount}</b> из {total} ({formatPercent(stats.solvedCount, total)})</p>
      <p>Всего попыток: <b>{stats.totalAttempts}</b></p>
      <ProgressBar percent={stats.percent} />
    </div>
  );
}