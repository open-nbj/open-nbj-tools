export function normalizeColor(value: string | null, fallback: string) {
  if (!value) {
    return fallback;
  }

  const normalized = value.startsWith('#') ? value : `#${value}`;

  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(normalized) ? normalized : fallback;
}
