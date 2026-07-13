import React from "react";
import { COLORS, SECTION_COLOR } from "../theme";

function TabIcon({ kind, color }) {
  const s = { width: 19, height: 19, stroke: color, fill: "none", strokeWidth: 1.6 };
  if (kind === "home") return <svg style={s} viewBox="0 0 24 24"><path d="M3 11l9-7 9 7" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10v10h14V10" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (kind === "write") return <svg style={s} viewBox="0 0 24 24"><path d="M4 20h4l11-11-4-4L4 16v4z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (kind === "progress") return <svg style={s} viewBox="0 0 24 24"><path d="M4 20V10M11 20V4M18 20v-7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  return <svg style={s} viewBox="0 0 24 24"><path d="M4 4h16v16H4z" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 9h16" strokeLinecap="round"/></svg>;
}

const TABS = [
  { id: "home", label: "Hoy", kind: "home" },
  { id: "write", label: "Diario", kind: "write" },
  { id: "progress", label: "Progreso", kind: "progress" },
  { id: "resources", label: "Recursos", kind: "resources" },
];

export default function BottomNav({ screen, onSelect }) {
  return (
    <div style={{ display: "flex", borderTop: `1px solid ${COLORS.borderSoft}`, background: COLORS.bg, padding: "12px 8px 16px", position: "relative" }}>
      {TABS.map((t) => {
        const active = screen === t.id;
        const color = SECTION_COLOR[t.id];
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className="pop-btn"
            style={{ flex: 1, background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", padding: "4px 0" }}
          >
            <div style={{ filter: active ? `drop-shadow(0 0 6px ${color}aa)` : "none" }}>
              <TabIcon kind={t.kind} color={active ? color : COLORS.textFaint} />
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: active ? COLORS.text : COLORS.textFaint }}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
