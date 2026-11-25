import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import TasksPage from "./pages/TasksPage";
import TaskPage from "./pages/TaskPage";
import StatsPage from "./pages/StatsPage";
import AboutPage from "./pages/AboutPage";
import ConceptsPage from "./pages/ConceptsPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TasksPage />} />
        <Route path="task/:id" element={<TaskPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="concepts" element={<ConceptsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}