import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { filterTasks, generateVariant } from "../lib/tasks";
import TaskList from "../components/TaskList";
import Timer from "../components/Timer";

export default function TasksPage() {
  const { tasks, loading, error } = useTasks();
  const [searchParams] = useSearchParams();
  const [examMode, setExamMode] = useState(false);
  const [examTasks, setExamTasks] = useState([]);
  const [examFinished, setExamFinished] = useState(false);

  // Фильтрация на основе URL
  const filters = {
    topic: searchParams.get("topic") || "",
    level: Number(searchParams.get("level")) || 0,
  };
  const visibleTasks = filterTasks(tasks, filters);

  // Запуск контрольной (5 случайных задач)
  function startExam() {
    const shuffled = [...tasks].sort(() => 0.5 - Math.random());
    setExamTasks(shuffled.slice(0, 5));
    setExamMode(true);
    setExamFinished(false);
  }

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Задачи</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={startExam} className="btn-exam">Режим «Контрольная» (5 задач)</button>
        <button onClick={() => setExamMode(false)} style={{ padding: '10px' }}>Обычный режим</button>
      </div>

      {examMode ? (
        <div>
          {!examFinished ? (
            <>
              <div style={{ background: 'var(--bad)', color: 'white', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
                <strong>ВНИМАНИЕ! Контрольная работа.</strong> Подсказки скрыты. Ответы будут засчитаны только при проверке.
              </div>
              <TaskList tasks={examTasks} hideHints={true} />
              <button onClick={() => { setExamFinished(true); setExamMode(false); }} style={{ marginTop: '20px', padding: '10px', background: 'var(--ok)', color: 'white', border: 'none', borderRadius: '4px' }}>
                Завершить контрольную
              </button>
            </>
          ) : (
             <div style={{ padding: '20px', background: 'var(--card)', borderRadius: '8px' }}>
                <h3>Контрольная завершена!</h3>
                <p>Ваши результаты сохранены в статистике. Перейдите на вкладку "Результаты", чтобы увидеть итог.</p>
             </div>
          )}
        </div>
      ) : (
        <TaskList tasks={visibleTasks} />
      )}
    </div>
  );
}