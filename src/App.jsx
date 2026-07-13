import React, { useState } from "react";
import { COLORS, SECTION_COLOR } from "./theme";
import { useAuth } from "./lib/useAuth";
import { useEntries } from "./lib/useEntries";
import AuthScreen from "./screens/Auth";
import HomeScreen from "./screens/Home";
import WriteScreen from "./screens/Write";
import ProgressScreen from "./screens/Progress";
import ResourcesScreen from "./screens/Resources";
import BottomNav from "./components/BottomNav";

export default function App() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [screen, setScreen] = useState("home");
  const [flashKey, setFlashKey] = useState(0);

  // Solo se piden los hooks de datos si hay usuario (evita llamadas innecesarias antes de login).
  const entries = useEntries(user?.id);

  function selectScreen(id) {
    if (id === screen) return;
    setScreen(id);
    setFlashKey((k) => k + 1);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px 12px", minHeight: "100vh" }}>
      <div
        style={{
          width: 390,
          maxWidth: "100%",
          background: COLORS.bg,
          borderRadius: 30,
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
          overflow: "hidden",
          minHeight: 700,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 12 }}>
          {authLoading ? (
            <div style={{ padding: 40, color: COLORS.textFaint, fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
              Cargando...
            </div>
          ) : !user ? (
            <AuthScreen />
          ) : (
            <div key={screen} className="screen-enter">
              {screen === "home" && <HomeScreen entries={entries} goToWrite={() => selectScreen("write")} />}
              {screen === "write" && <WriteScreen entries={entries} />}
              {screen === "progress" && <ProgressScreen entries={entries} />}
              {screen === "resources" && <ResourcesScreen />}
            </div>
          )}
        </div>

        {user && (
          <>
            <div
              key={flashKey}
              className="bottom-flash"
              style={{
                position: "absolute", left: 0, right: 0, bottom: 0, height: 110,
                background: SECTION_COLOR[screen], filter: "blur(34px)", opacity: 0, pointerEvents: "none",
              }}
            />
            <BottomNav screen={screen} onSelect={selectScreen} />
          </>
        )}
      </div>
    </div>
  );
}
