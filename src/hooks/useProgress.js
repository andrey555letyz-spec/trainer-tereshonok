import { useState, useEffect, useCallback } from "react";
const KEY = "trainer:progress";
export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) ?? { attempts: [] }; }
    catch { return { attempts: [] }; }
  });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(progress)); }, [progress]);
  const addAttempt = useCallback((taskId, ok) => {
    setProgress((p) => ({ ...p, attempts: [...p.attempts, { taskId, ok, at: new Date().toISOString() }] }));
  }, []);
  const reset = useCallback(() => setProgress({ attempts: [] }), []);
  return { progress, addAttempt, reset };
}