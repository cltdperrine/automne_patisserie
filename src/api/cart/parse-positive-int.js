export function parsePositiveInt(value, label) {
  const n = Number.parseInt(String(value), 10);
  if (Number.isNaN(n) || n < 1) {
    return { ok: false, error: `Invalid ${label}` };
  }
  return { ok: true, value: n };
}
