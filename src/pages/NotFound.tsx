import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-32 px-4">
      <h1 className="font-display text-6xl font-semibold text-foreground mb-4">404</h1>
      <p className="text-muted-foreground mb-8">Essa página não existe ou foi movida.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
