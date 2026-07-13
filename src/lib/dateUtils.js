// Todo en fechas locales, formato YYYY-MM-DD, para comparar sin líos de zona horaria/hora.

export function toDateKey(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayKey() {
  return toDateKey(new Date());
}

export function addDays(dateKey, days) {
  const d = new Date(dateKey + "T00:00:00");
  d.setDate(d.getDate() + days);
  return toDateKey(d);
}

const DAY_LABELS = ["D", "L", "M", "M", "J", "V", "S"];
const DATE_FMT = new Intl.DateTimeFormat("es", { day: "numeric", month: "short" });

export function dayLabel(dateKey) {
  const d = new Date(dateKey + "T00:00:00");
  return DAY_LABELS[d.getDay()];
}

export function shortDate(dateKey) {
  const d = new Date(dateKey + "T00:00:00");
  return DATE_FMT.format(d);
}

// Últimos 7 días (incluyendo hoy), en orden cronológico, marcando cuáles tienen entrada.
export function buildLast7Days(entryDateKeys) {
  const set = new Set(entryDateKeys);
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const key = addDays(todayKey(), -i);
    days.push({ date: key, day: dayLabel(key), done: set.has(key) });
  }
  return days;
}

// Racha actual: cuenta hacia atrás desde hoy (o desde ayer si hoy aún no se escribió).
export function currentStreak(entryDateKeys) {
  const set = new Set(entryDateKeys);
  let streak = 0;
  let cursor = set.has(todayKey()) ? todayKey() : addDays(todayKey(), -1);
  while (set.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

// Racha más larga histórica.
export function longestStreak(entryDateKeys) {
  if (entryDateKeys.length === 0) return 0;
  const sorted = [...new Set(entryDateKeys)].sort();
  let longest = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (addDays(sorted[i - 1], 1) === sorted[i]) {
      run += 1;
    } else {
      run = 1;
    }
    longest = Math.max(longest, run);
  }
  return longest;
}
