export default function HintBlock({ task }) {
  return (
    <>
      <details className="hint">
        <summary>Подсказка</summary>
        <p>{task.hint || 'Подсказки нет'}</p>
      </details>
      <details className="solution">
        <summary>Разбор</summary>
        <p>{task.solution || ''}</p>
      </details>
    </>
  );
}