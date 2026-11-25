import { useProgressContext } from "../context/ProgressContext";
import { useTasks } from "../hooks/useTasks";
import { formatPercent } from "../lib/format";

export default function StatsPage() {
  const { progress, reset } = useProgressContext();
  const { tasks } = useTasks();

  const solvedIds = new Set(progress.attempts.filter(a => a.ok).map(a => a.taskId));
  const totalTasks = tasks.length;
  const totalAttempts = progress.attempts.length;

  // Экспорт в CSV
  const exportCSV = () => {
    let csv = "Задача;Успех;Время\n";
    progress.attempts.forEach(a => {
      csv += `${a.taskId};${a.ok ? "Да" : "Нет"};${a.at}\n`;
    });
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "progress.csv";
    link.click();
  };

  const handleReset = () => {
    if (window.confirm("Вы уверены, что хотите сбросить весь прогресс?")) {
      reset();
    }
  };

  return (
    <div>
      <h2>Мои результаты</h2>
      <div className="card">
        <p>Решено задач: <b>{solvedIds.size}</b> из {totalTasks} ({formatPercent(solvedIds.size, totalTasks)})</p>
        <p>Всего попыток: <b>{totalAttempts}</b></p>
        <progress value={solvedIds.size} max={totalTasks} style={{ width: '100%', height: '20px' }}></progress>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={exportCSV} style={{ padding: '10px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Экспорт в CSV</button>
        <button onClick={handleReset} style={{ padding: '10px', background: 'var(--bad)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Сбросить прогресс</button>
      </div>
      
      {/* Таблица по темам (упрощенная) */}
      <h3 style={{ marginTop: '30px' }}>Разбивка по темам</h3>
      <table className="table-stats">
        <thead><tr><th>Тема</th><th>Решено</th><th>Всего задач</th></tr></thead>
        <tbody>
          {Array.from(new Set(tasks.map(t => t.topic))).map(topic => {
             const topicTasks = tasks.filter(t => t.topic === topic);
             const solvedInTopic = topicTasks.filter(t => solvedIds.has(t.id)).length;
             return (
               <tr key={topic}>
                 <td>{topic}</td>
                 <td>{solvedInTopic}</td>
                 <td>{topicTasks.length}</td>
               </tr>
             );
          })}
        </tbody>
      </table>
    </div>
  );
}