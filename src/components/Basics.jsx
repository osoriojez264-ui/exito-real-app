import React from "react";
import { COLORS, glow } from "../theme";

export function Card({ children, style }) {
  return (
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, ...style }}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, color }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10.5,
        letterSpacing: 1.6,
        textTransform: "uppercase",
        color: color || COLORS.textMuted,
        marginBottom: 6,
      }}
    >
      {children}
    </div>
  );
}

export function TopBar({ eyebrow, title, eyebrowColor }) {
  return (
    <div style={{ padding: "26px 20px 18px" }}>
      <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
      <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 22, color: COLORS.text, letterSpacing: -0.3 }}>
        {title}
      </div>
    </div>
  );
}

export function Dot({ done }) {
  return (
    <div
      style={{
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: done ? COLORS.amber : "transparent",
        border: done ? "none" : `1.5px solid ${COLORS.border}`,
        boxShadow: done ? glow(COLORS.amber, 0.55) : "none",
      }}
    />
  );
}

export function StreakRow({ days }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {days.map((d) => (
        <div key={d.date} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Dot done={d.done} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.textFaint }}>
            {d.day}
          </span>
        </div>
      ))}
    </div>
  );
}
