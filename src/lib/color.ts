/** Darkens a #rrggbb hex color by the given amount (0-1), for hover/active shades. */
export function darken(hex: string, amount = 0.15): string {
  const match = /^#?([a-f\d]{6})$/i.exec(hex.trim());
  if (!match) return hex;
  const num = parseInt(match[1], 16);
  const r = Math.max(0, Math.round(((num >> 16) & 0xff) * (1 - amount)));
  const g = Math.max(0, Math.round(((num >> 8) & 0xff) * (1 - amount)));
  const b = Math.max(0, Math.round((num & 0xff) * (1 - amount)));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function isValidHexColor(value: string): boolean {
  return /^#[0-9a-f]{6}$/i.test(value.trim());
}
