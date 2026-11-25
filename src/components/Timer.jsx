import { useState, useEffect } from "react";
import { formatTime } from "../lib/format";
export default function Timer({ initialSeconds = 0, onTimeUp }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => {
        if (onTimeUp && s >= 1 && s - 1 === 0) onTimeUp();
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [onTimeUp]);
  return <div className="timer">{formatTime(seconds)}</div>;
}