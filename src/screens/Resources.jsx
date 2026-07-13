import React from "react";
import { COLORS, glow } from "../theme";
import { TopBar } from "../components/Basics";
import { useResources } from "../lib/useResources";

export default function ResourcesScreen() {
  const { resources, loading } = useResources();

  return (
    <div>
      <TopBar eyebrow="Éxito Real Plus" title="Recursos" eyebrowColor={COLORS.yellow} />
      <div style={{ padding: "0 20px" }}>
        {loading && (
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.textFaint }}>Cargando...</div>
        )}

        {resources.map((r) => (
          <a
            key={r.id}
            href={r.is_free ? undefined : r.checkout_url}
            target={r.is_free ? undefined : "_blank"}
            rel="noreferrer"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px 16px",
              backgroundImage: r.is_free ? "none" : `radial-gradient(140% 100% at 100% 0%, ${COLORS.yellowDim}, transparent 65%)`,
              backgroundColor: COLORS.surface,
              border: `1px solid ${r.is_free ? COLORS.border : COLORS.yellow + "45"}`,
              borderRadius: 12,
              marginBottom: 10,
              textDecoration: "none",
              cursor: r.is_free ? "default" : "pointer",
            }}
          >
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13.5, color: COLORS.text }}>
                {r.title}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: COLORS.textFaint, marginTop: 4 }}>
                {r.type}
              </div>
            </div>
            {r.is_free ? (
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.textMuted, letterSpacing: 0.5 }}>
                GRATIS
              </span>
            ) : (
              <span
                style={{
                  width: 26, height: 26, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: COLORS.yellow, boxShadow: glow(COLORS.yellow, 0.45), fontSize: 12,
                }}
              >
                ●
              </span>
            )}
          </a>
        ))}

        <div
          style={{
            marginTop: 6, padding: "22px 20px", borderRadius: 14, textAlign: "center",
            backgroundImage: `radial-gradient(120% 140% at 50% 0%, ${COLORS.yellowDim}, transparent 70%)`,
            backgroundColor: COLORS.surfaceRaised, border: `1px solid ${COLORS.border}`,
          }}
        >
          <div style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic", fontSize: 16, color: COLORS.text, marginBottom: 14 }}>
            Desbloquea todo con Éxito Real Plus
          </div>
          <a
            href={import.meta.env.VITE_PLUS_CHECKOUT_URL || "#"}
            target="_blank"
            rel="noreferrer"
            className="pop-btn"
            style={{
              display: "inline-block",
              background: COLORS.yellow, color: "#0B0B0D", border: "none", borderRadius: 9,
              padding: "10px 22px", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13.5,
              cursor: "pointer", boxShadow: glow(COLORS.yellow, 0.6), textDecoration: "none",
            }}
          >
            Ver planes
          </a>
        </div>
      </div>
    </div>
  );
}
