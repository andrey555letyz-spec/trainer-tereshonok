import { useSearchParams } from "react-router-dom";

export default function Filters({ tasks }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "";
  const level = Number(searchParams.get("level")) || 0;

  const topics = Array.from(new Set(tasks.map(t => t.topic))).sort();

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  return (
    <div className="filters">
      {/* Связываем label с select через htmlFor и id */}
      <label htmlFor="filter-topic">Тема:</label>
      <select 
        id="filter-topic" 
        value={topic} 
        onChange={(e) => handleFilterChange("topic", e.target.value)}
      >
        <option value="">Все темы</option>
        {topics.map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      <label htmlFor="filter-level">Уровень:</label>
      <select 
        id="filter-level" 
        value={level} 
        onChange={(e) => handleFilterChange("level", e.target.value)}
      >
        <option value={0}>Любой</option>
        <option value={1}>1 (базовый)</option>
        <option value={2}>2 (средний)</option>
        <option value={3}>3 (сложный)</option>
      </select>
    </div>
  );
}