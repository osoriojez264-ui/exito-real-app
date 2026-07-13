export const PROMPTS = [
  "¿Qué decisión de hoy se alineó con quién quieres ser?",
  "¿Qué evitaste hoy que en el fondo sabías que debías hacer?",
  "Nombra una incomodidad de hoy que en realidad fue progreso.",
  "¿En qué momento de hoy actuaste por costumbre y no por elección?",
  "¿Qué le dirías a la persona que eras hace un año sobre hoy?",
  "¿Qué patrón se repitió hoy que ya no quieres repetir mañana?",
  "¿Dónde pusiste tu energía hoy sin darte cuenta?",
];

export function promptOfTheDay(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const dayOfYear = Math.floor(diff / 86400000);
  return PROMPTS[dayOfYear % PROMPTS.length];
}
