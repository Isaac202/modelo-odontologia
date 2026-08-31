import { Link, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Smile } from "lucide-react";
import { supabase } from "../lib/supabase";

export function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase?.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0f9b8e] text-white flex items-center justify-center">
              <Smile className="w-4 h-4" />
            </div>
            <span className="font-display font-semibold">Painel · Sorriso Vital</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
