"use strict";

export function parseAnswer(input) {
  if (input === null || input === undefined) return NaN;
  const normalized = String(input).trim().replace(/\s+/g, "").replace(",", ".");
  return Number(normalized);
}

export function checkNumeric(input, expected, tolerance = 0.01) {
  const value = parseAnswer(input);
  if (Number.isNaN(value)) {
    return { ok: false, reason: "not-a-number" };
  }
  const limit = expected === 0 ? tolerance : Math.abs(expected) * tolerance;
  const ok = Math.abs(value - expected) <= limit;
  return { ok, reason: ok ? "correct" : "wrong", value };
}

export function checkText(input, expected) {
  const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, " ");
  const ok = norm(input) === norm(expected);
  return { ok, reason: ok ? "correct" : "wrong" };
}

export function checkBoolTable(input, expected) {
  if (input === null || input === undefined) return { ok: false, reason: "empty" };
  
  // Убираем все пробелы из ввода и эталона
  const cleanInput = String(input).replace(/\s+/g, "");
  const cleanExpected = String(expected).replace(/\s+/g, "");
  
  // Проверяем, что введены только символы 0 и 1
  if (!/^[01]+$/.test(cleanInput)) {
    return { ok: false, reason: "invalid-format" };
  }
  
  if (cleanInput.length !== cleanExpected.length) {
    return { ok: false, reason: "length-mismatch" };
  }
  
  const ok = cleanInput === cleanExpected;
  return { ok, reason: ok ? "correct" : "wrong", value: cleanInput };
}