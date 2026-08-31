import { Smile } from "lucide-react";
import { useSite } from "../context/SiteContext";

export function BrandMark({ size = "md" }: { size?: "sm" | "md" }) {
  const { config } = useSite();
  const boxSize = size === "sm" ? "w-8 h-8" : "w-9 h-9";
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  if (config.logoUrl) {
    return (
      <img
        src={config.logoUrl}
        alt={config.clinicName}
        className={`${boxSize} rounded-xl object-contain shrink-0 bg-white border border-border`}
      />
    );
  }

  return (
    <div
      className={`${boxSize} rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0`}
    >
      <Smile className={iconSize} />
    </div>
  );
}
