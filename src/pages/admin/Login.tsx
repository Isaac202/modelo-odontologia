import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Smile } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase não configurado.");
      return;
    }
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError("E-mail ou senha inválidos.");
      return;
    }
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 rounded-xl bg-[#0f9b8e] text-white flex items-center justify-center">
            <Smile className="w-5 h-5" />
          </div>
          <span className="font-display text-lg font-semibold text-foreground">Painel Sorriso Vital</span>
        </div>
        <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]/40"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#0f9b8e] hover:bg-[#0c7a70] text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
