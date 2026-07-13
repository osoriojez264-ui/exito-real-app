import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

// El catálogo vive en la tabla `resources`, no en el código —
// así puedes agregar/editar plantillas, PDFs y audios sin volver a desplegar la app.
export function useResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from("resources")
      .select("id, title, type, is_free, checkout_url, sort_order")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (!active) return;
        if (!error) setResources(data ?? []);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { resources, loading };
}
