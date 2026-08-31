import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function RequireAuth({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<"loading" | "authed" | "guest">("loading");

  useEffect(() => {
    if (!supabase) {
      setStatus("guest");
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? "authed" : "guest");
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? "authed" : "guest");
    });
    return () => subscription.unsubscribe();
  }, []);

  if (status === "loading") {
    return <div className="p-16 text-center text-muted-foreground">Carregando...</div>;
  }

  if (status === "guest") {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
