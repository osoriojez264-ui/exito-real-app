import React from "react";
import { COLORS, glow } from "../theme";
import { Card, Eyebrow, TopBar, StreakRow } from "../components/Basics";

export default function ProgressScreen({ entries }) {
  const { stats, last7 } = entries;
  const cards = [
    { label: "Racha actual", value: stats.current, unit: "días" },
    { label: "Racha más larga", value: stats.longest, unit: "días" },
    { label: "Entradas", value: stats.total, unit: "total" },
  ];

  return (
    <div>
      <TopBar eyebrow="Tu práctica" title="Progreso" eyebrowColor={COLORS.blue} />
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {cards.map((s) => (
            <Card key={s.label} style={{ flex: 1, padding: "16px 12px", textAlign: "center", borderColor: COLORS.blue + "30" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 22, color: COLORS.text }}>
                {s.value}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: COLORS.textFaint, marginTop: 4, textTransform: "uppercase" }}>
                {s.unit}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10.5, color: COLORS.textMuted, marginTop: 6 }}>
                {s.label}
              </div>
            </Card>
          ))}
        </div>

        <Card style={{ padding: 18, borderColor: COLORS.blue + "30", boxShadow: glow(COLORS.blue, 0.14) }}>
          <Eyebrow color={COLORS.blue}>Últimos 7 días</Eyebrow>
          <div style={{ marginTop: 14 }}>
            <StreakRow days={last7} />
          </div>
        </Card>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: COLORS.textMuted, lineHeight: 1.55, marginTop: 18 }}>
          El progreso se acumula, no se persigue.
        </p>
      </div>
    </div>
  );
}
