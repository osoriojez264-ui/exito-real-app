import React from "react";
import { COLORS, glow } from "../theme";
import { Card, Eyebrow, TopBar, StreakRow } from "../components/Basics";
import GlassPanel from "../components/GlassPanel";
import { promptOfTheDay } from "../lib/prompts";

const DATE_FMT = new Intl.DateTimeFormat("es", { weekday: "long", day: "numeric", month: "long" });

export default function HomeScreen({ entries, goToWrite }) {
  const { stats, last7, todayEntry, loading } = entries;
  const todayLabel = DATE_FMT.format(new Date());

  return (
    <div>
      <TopBar eyebrow={todayLabel} title="Hola de nuevo." eyebrowColor={COLORS.amber} />

      <div style={{ padding: "0 20px" }}>
        <Card style={{ padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <Eyebrow>Tu racha</Eyebrow>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: COLORS.amber, fontWeight: 500 }}>
              {loading ? "…" : `${stats.current}/7`}
            </span>
          </div>
          <StreakRow days={last7} />
        </Card>

        <GlassPanel tint={COLORS.violet} active style={{ marginTop: 14, padding: "26px 20px" }}>
          <Eyebrow color={COLORS.violet}>Reflexión de hoy</Eyebrow>
          <div style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic", fontSize: 22, lineHeight: 1.4, color: COLORS.text, marginTop: 8 }}>
            {promptOfTheDay()}
          </div>

          {todayEntry ? (
            <div style={{ marginTop: 18, fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.textMuted }}>
              Ya escribiste hoy. <button onClick={goToWrite} className="pop-btn" style={{ background: "none", border: "none", color: COLORS.violet, cursor: "pointer", fontWeight: 600, padding: 0 }}>Ver / editar →</button>
            </div>
          ) : (
            <button
              onClick={goToWrite}
              className="pop-btn"
              style={{
                marginTop: 20,
                background: COLORS.text,
                color: COLORS.bg,
                border: "none",
                borderRadius: 9,
                padding: "11px 20px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 13.5,
                cursor: "pointer",
                boxShadow: glow(COLORS.violet, 0.5),
              }}
            >
              Escribir mi reflexión →
            </button>
          )}
        </GlassPanel>

        <div style={{ margin: "24px 0 10px" }}>
          <Eyebrow>Esta semana</Eyebrow>
        </div>
        {entries.entries.slice(0, 3).map((e) => (
          <div
            key={e.entry_date}
            style={{ padding: "13px 0", borderBottom: `1px solid ${COLORS.borderSoft}`, display: "flex", gap: 14 }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.textFaint, minWidth: 38, paddingTop: 2 }}>
              {e.entry_date.slice(5)}
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: COLORS.textMuted, lineHeight: 1.45, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {e.content}
            </span>
          </div>
        ))}
        {!loading && entries.entries.length === 0 && (
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.textFaint, padding: "8px 0" }}>
            Todavía no tienes reflexiones. Hoy es un buen día para empezar.
          </div>
        )}
      </div>
    </div>
  );
}
