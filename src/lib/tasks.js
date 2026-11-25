export function filterTasks(tasks, filters) {
  return tasks.filter(task => {
    const matchTopic = !filters.topic || task.topic === filters.topic;
    const matchLevel = !filters.level || task.level === Number(filters.level);
    return matchTopic && matchLevel;
  });
}

// Генератор вариантов (упрощенный)
export function generateVariant(tasks) {
  return tasks.map(task => {
    if (task.answer.type === 'text') return task; // Текстовые не трогаем
    const shift = Math.floor(Math.random() * 5) + 1; // Случайное число 1-5
    return {
      ...task,
      id: `gen-${task.id}-${Date.now()}`,
      title: `${task.title} (Вариант)`,
      statement: task.statement.replace(/Дано:.*?\./, `Дано: измененные данные (сдвиг +${shift}).`), // Упрощенно
      answer: { ...task.answer, value: task.answer.value + shift }
    };
  });
}