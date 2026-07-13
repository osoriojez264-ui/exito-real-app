import React, { useEffect, useState } from "react";
import { COLORS, glow } from "../theme";
import { TopBar } from "../components/Basics";
import GlassPanel from "../components/GlassPanel";
import { promptOfTheDay } from "../lib/prompts";

export default function WriteScreen({ entries }) {
  const { todayEntry, saveToday, saving } = entries;
  const [text, setText] = useState(todayEntry?.content ?? "");
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setText(todayEntry?.content ?? "");
  }, [todayEntry]);

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const active = text.length > 0;

  async function handleSave() {
    await saveToday(text);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <div>
      <TopBar eyebrow="Hoy" title="Tu reflexión" eyebrowColor={COLORS.violet} />
      <div style={{ padding: "0 20px" }}>
        <div style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic", fontSize: 17, color: COLORS.text, lineHeight: 1.45, marginBottom: 16 }}>
          {promptOfTheDay()}
        </div>

        <GlassPanel tint={COLORS.violet} active={active} style={{ padding: 4 }}>
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value); setJustSaved(false); }}
            placeholder="Escribe sin filtrar. Nadie más lee esto."
            style={{
              width: "100%",
              minHeight: 206,
              background: "transparent",
              border: "none",
              padding: 14,
              fontFamily: "'Inter', sans-serif",
              fontSize: 14.5,
              color: COLORS.text,
              lineHeight: 1.65,
              resize: "none",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </GlassPanel>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.textFaint }}>
            {words} palabras
          </span>
          <button
            onClick={handleSave}
            disabled={!text.trim() || saving}
            className="pop-btn"
            style={{
              background: justSaved ? COLORS.violet : text.trim() ? COLORS.text : COLORS.borderSoft,
              color: justSaved || text.trim() ? COLORS.bg : COLORS.textFaint,
              border: "none",
              borderRadius: 9,
              padding: "10px 18px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13.5,
              cursor: text.trim() ? "pointer" : "default",
              boxShadow: justSaved ? glow(COLORS.violet, 0.55) : "none",
              transition: "all 0.25s ease",
            }}
          >
            <span key={justSaved ? "on" : "off"} className="pop-in" style={{ display: "inline-block" }}>
              {saving ? "Guardando..." : justSaved ? "Guardada ✓" : "Guardar reflexión"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
