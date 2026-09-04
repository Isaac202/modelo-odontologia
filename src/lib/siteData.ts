export type EaService = {
  id: number;
  name: string;
  description: string | null;
};

export type WorkingDay = {
  start: string;
  end: string;
  breaks?: { start: string; end: string }[];
} | null;

export type WorkingPlan = Partial<Record<
  "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday",
  WorkingDay
>>;

export type SiteData = {
  connected: boolean;
  services: EaService[];
  workingPlan: WorkingPlan | null;
  address: string | null;
  phoneDisplay: string | null;
};

export async function fetchSiteData(slug: string): Promise<SiteData> {
  const empty: SiteData = {
    connected: false,
    services: [],
    workingPlan: null,
    address: null,
    phoneDisplay: null,
  };
  try {
    const res = await fetch(`/api/site-data?slug=${encodeURIComponent(slug)}`);
    if (!res.ok) return empty;
    const data = await res.json().catch(() => null);
    if (!data) return empty;
    return {
      connected: Boolean(data.connected),
      services: Array.isArray(data.services) ? data.services : [],
      workingPlan: data.workingPlan ?? null,
      address: data.address ?? null,
      phoneDisplay: data.phoneDisplay ?? null,
    };
  } catch {
    return empty;
  }
}

const DAY_LABELS: Record<string, string> = {
  sunday: "Domingo",
  monday: "Segunda",
  tuesday: "Terça",
  wednesday: "Quarta",
  thursday: "Quinta",
  friday: "Sexta",
  saturday: "Sábado",
};

const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export function formatWorkingPlan(plan: WorkingPlan): { label: string; hours: string }[] {
  const rows: { label: string; hours: string }[] = [];
  let i = 0;
  while (i < DAY_ORDER.length) {
    const day = DAY_ORDER[i];
    const value = plan[day as keyof WorkingPlan];
    if (!value) {
      i++;
      continue;
    }
    let j = i;
    while (
      j + 1 < DAY_ORDER.length &&
      plan[DAY_ORDER[j + 1] as keyof WorkingPlan]?.start === value.start &&
      plan[DAY_ORDER[j + 1] as keyof WorkingPlan]?.end === value.end
    ) {
      j++;
    }
    const label =
      j > i ? `${DAY_LABELS[DAY_ORDER[i]]} a ${DAY_LABELS[DAY_ORDER[j]]}` : DAY_LABELS[DAY_ORDER[i]];
    rows.push({ label, hours: `${value.start} às ${value.end}` });
    i = j + 1;
  }
  return rows;
}
