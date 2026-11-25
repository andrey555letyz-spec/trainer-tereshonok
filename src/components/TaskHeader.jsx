export default function TaskHeader({ task }) {
  return (
    <>
      <span className="level-badge">Уровень {task.level}</span>
      <h3>{task.id}. {task.title}</h3>
    </>
  );
}