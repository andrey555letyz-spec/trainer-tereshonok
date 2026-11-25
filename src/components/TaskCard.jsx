import { useState, useCallback } from "react";
import { checkNumeric, checkText } from "../lib/check";
import { useProgressContext } from "../context/ProgressContext";

export default function TaskCard({ task, hideHints = false }) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const { addAttempt } = useProgressContext();

  const isSolved = result?.ok;
  const outOfTries = attempts >= 3 && !isSolved;
  const stateClass = result ? (result.ok ? "correct" : "wrong") : "";

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (isSolved || outOfTries) return;
    const res = task.answer.type === "text" 
      ? checkText(answer, task.answer.value)
      : checkNumeric(answer, task.answer.value, task.answer.tolerance);
    setResult(res);
    if (res.reason !== "not-a-number") {
      if (!res.ok) setAttempts((n) => n + 1);
      addAttempt(task.id, res.ok);
    }
  }, [answer, task, isSolved, outOfTries, addAttempt]);

  return (
    <article className={`card ${stateClass}`} id={`task-${task.id}`}>
      <span className="level-badge">Уровень {task.level}</span>
      <h3>{task.id}. {task.title}</h3>
      <p className="statement">{task.statement}</p>
      {task.image && (
        <figure className="illustration"><img src={task.image} alt="Иллюстрация" /></figure>
      )}
      <form className="answer-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Ваш ответ</legend>
          <label htmlFor={`ans-${task.id}`}>Ответ: {task.answer.unit}</label>
          <input id={`ans-${task.id}`} type="text" value={answer} onChange={(e) => { setAnswer(e.target.value); setResult(null); }} disabled={outOfTries || isSolved} required />
          <button type="submit" disabled={outOfTries || isSolved}>Проверить</button>
        </fieldset>
      </form>
      {result && (
        <p className={`result ${stateClass}`}>
          {result.reason === "not-a-number" ? "Введите число" : result.ok ? "Верно!" : `Неверно. Осталось: ${3 - attempts}`}
        </p>
      )}
      
      {!hideHints && (
        <>
          <details className="hint"><summary>Подсказка</summary><p>{task.hint}</p></details>
          {(outOfTries || isSolved) && <details open><summary>Разбор</summary><p>{task.solution}</p></details>}
        </>
      )}
    </article>
  );
}