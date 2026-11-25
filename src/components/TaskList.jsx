import TaskCard from './TaskCard';
export default function TaskList({ tasks, hideHints }) {
  if (!tasks || tasks.length === 0) return <p>Задач нет.</p>;
  return (
    <div className="cards">
      {tasks.map(task => <TaskCard key={task.id} task={task} hideHints={hideHints} />)}
    </div>
  );
}