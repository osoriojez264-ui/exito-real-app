import React from "react";
import { glow } from "../theme";

export default function GlassPanel({ children, tint, active, style }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 16,
        border: `1px solid ${active ? tint + "55" : "rgba(255,255,255,0.09)"}`,
        backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.015)), radial-gradient(130% 100% at 12% 0%, ${tint}26, transparent 60%)`,
        backgroundColor: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        boxShadow: active
          ? `inset 0 1px 0 rgba(255,255,255,0.12), ${glow(tint, 0.32)}`
          : "inset 0 1px 0 rgba(255,255,255,0.08)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
