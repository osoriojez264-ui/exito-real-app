export const COLORS = {
  bg: "#0B0B0D",
  surface: "#151517",
  surfaceRaised: "#1C1C1F",
  border: "#28282C",
  borderSoft: "#1F1F23",
  text: "#F3F2EE",
  textMuted: "#8D8C92",
  textFaint: "#5C5B60",
  amber: "#FFC24B",
  blue: "#5B8CFF",
  violet: "#B18CFF",
  yellow: "#F5D33C",
  yellowDim: "rgba(245,211,60,0.16)",
};

// Sección → color de tema (mismo mapeo aprobado en el prototipo).
export const SECTION_COLOR = {
  home: COLORS.amber,
  write: COLORS.violet,
  progress: COLORS.blue,
  resources: COLORS.yellow,
};

export function glow(color, intensity = 1) {
  return `0 0 ${18 * intensity}px ${color}55, 0 0 ${4 * intensity}px ${color}88`;
}
