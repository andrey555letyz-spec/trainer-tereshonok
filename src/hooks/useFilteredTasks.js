import { useState, useMemo } from "react";
import { filterTasks } from "../lib/tasks";

export function useFilteredTasks(tasks) {
  const [filters, setFilters] = useState({ topic: "", level: 0 });

  // useMemo предотвращает пересчет при каждом рендере, если tasks или filters не менялись
  const visibleTasks = useMemo(() => {
    return filterTasks(tasks, filters);
  }, [tasks, filters]);

  return { filters, setFilters, visibleTasks };
}