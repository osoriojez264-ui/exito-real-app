import React, { useState } from "react";
import { COLORS, glow } from "../theme";
import { useAuth } from "../lib/useAuth";

export default function AuthScreen() {
  const { sendMagicLink } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    try {
      await sendMagicLink(email.trim());
      setStatus("sent");
    } catch (err) {
      setErrorMsg(err.message || "Algo salió mal, intenta de nuevo.");
      setStatus("error");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", justifyContent: "center", minHeight: "100%", padding: "0 20px" }}>
      <img src="/logo.png" alt="Éxito Real" className="logo-glow-in" style={{ width: 92, height: 92, marginBottom: 22 }} />
      <div style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic", fontSize: 26, color: COLORS.text, marginBottom: 6 }}>
        Éxito Real
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: COLORS.textMuted, marginBottom: 28 }}>
        Tu práctica diaria de reflexión.
      </div>

      {status === "sent" ? (
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13.5,
            color: COLORS.text,
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: 16,
            lineHeight: 1.5,
          }}
        >
          Te enviamos un enlace a <strong>{email}</strong>. Ábrelo desde este mismo dispositivo para entrar.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            style={{
              width: "100%",
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: "13px 14px",
              fontSize: 14,
              color: COLORS.text,
              outline: "none",
              marginBottom: 12,
            }}
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="pop-btn"
            style={{
              width: "100%",
              background: COLORS.text,
              color: COLORS.bg,
              border: "none",
              borderRadius: 10,
              padding: "13px 14px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: glow(COLORS.violet, 0.4),
            }}
          >
            {status === "sending" ? "Enviando..." : "Entrar con email"}
          </button>
          {status === "error" && (
            <div style={{ color: "#FF6B6B", fontSize: 12.5, marginTop: 10 }}>{errorMsg}</div>
          )}
        </form>
      )}
    </div>
  );
}
