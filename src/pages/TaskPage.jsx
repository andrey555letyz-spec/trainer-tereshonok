import { useParams, Link } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import TaskCard from "../components/TaskCard";

export default function TaskPage() {
  const { id } = useParams();
  const { tasks, loading } = useTasks();

  if (loading) return <p>Загрузка...</p>;
  
  const task = tasks.find(t => String(t.id) === String(id));

  if (!task) {
    return (
      <div>
        <h2>Задача не найдена</h2>
        <p>Задачи с номером {id} не существует.</p>
        <Link to="/">Вернуться к списку</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px' }}>← Назад к задачам</Link>
      <TaskCard task={task} />
    </div>
  );
}