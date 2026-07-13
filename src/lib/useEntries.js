import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { todayKey, buildLast7Days, currentStreak, longestStreak } from "./dateUtils";

// Trae las entradas del usuario y expone helpers para guardar la de hoy
// y leer estadísticas ya calculadas (racha actual, racha más larga, etc).
export function useEntries(userId) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("entries")
      .select("entry_date, content, created_at")
      .eq("user_id", userId)
      .order("entry_date", { ascending: false })
      .limit(120);

    if (error) {
      setError(error.message);
    } else {
      setEntries(data ?? []);
      setError(null);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveToday = useCallback(
    async (content) => {
      if (!userId || !content.trim()) return;
      setSaving(true);
      const { error } = await supabase.from("entries").upsert(
        {
          user_id: userId,
          entry_date: todayKey(),
          content: content.trim(),
        },
        { onConflict: "user_id,entry_date" }
      );
      setSaving(false);
      if (error) {
        setError(error.message);
        throw error;
      }
      await refresh();
    },
    [userId, refresh]
  );

  const dateKeys = entries.map((e) => e.entry_date);
  const todayEntry = entries.find((e) => e.entry_date === todayKey()) ?? null;

  return {
    entries,
    todayEntry,
    loading,
    saving,
    error,
    saveToday,
    refresh,
    stats: {
      current: currentStreak(dateKeys),
      longest: longestStreak(dateKeys),
      total: entries.length,
    },
    last7: buildLast7Days(dateKeys),
  };
}
