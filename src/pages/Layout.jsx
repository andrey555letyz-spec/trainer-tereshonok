import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import { useTasks } from "../hooks/useTasks";
import Filters from "../components/Filters";
import Timer from "../components/Timer";

export default function Layout() {
  const { theme, toggleTheme } = useThemeContext();
  const { tasks } = useTasks();
  const location = useLocation();

  // Проверяем, находимся ли мы на странице "О проекте"
  const isAboutPage = location.pathname === "/about";

  return (
    <div className="layout">
      <header>
        <h1>Тренажёр «Алгоритмы»</h1>
        <nav>
          <ul>
            <li><NavLink to="/">Задачи</NavLink></li>
            <li><NavLink to="/stats">Результаты</NavLink></li>
            <li><NavLink to="/concepts">Понятия</NavLink></li>
            <li><NavLink to="/about">О проекте</NavLink></li>
            <li>
              <button onClick={toggleTheme} style={{ background: 'transparent', border: '1px solid white', color: 'white', cursor: 'pointer', borderRadius: '4px', padding: '2px 8px' }}>
                {theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая'}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div className="layout-main">
        {/* Скрываем боковую панель с таймером и фильтрами на странице "О проекте" */}
        {!isAboutPage && (
          <aside className="sidebar">
            <h2>Управление</h2>
            <Timer />
            <Filters tasks={tasks} />
          </aside>
        )}
        
        <main className="content" style={{ gridColumn: isAboutPage ? '1 / -1' : 'auto' }}>
          <Outlet />
        </main>
      </div>

      {/* ВЕРНУЛИ ПОЛНУЮ ИНФОРМАЦИЮ ОБ АВТОРЕ */}
      <footer>
        <p><small>Автор: Терешонок А.А., группа 5117241, 2026. Вариант 20. Все права защищены.</small></p>
      </footer>
    </div>
  );
}