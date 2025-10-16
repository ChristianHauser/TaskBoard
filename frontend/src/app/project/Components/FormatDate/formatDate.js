// formatDate.js
export default function formatDate(input, locale = "de-DE") {
  if (input == null) return "—";                    // null/undefined guard

  let d;
  if (input instanceof Date) d = input;             // accept Date
  else if (typeof input === "number") d = new Date(input); // timestamp ms
  else if (typeof input === "string") {
    const s = input.trim();
    // If it's "YYYY-MM-DD HH:mm:ss", make it ISO-ish. If it's already ISO or has TZ, keep it.
    const normalized =
      s.includes("T") || /[+-]\d{2}:?\d{2}|Z$/.test(s) ? s : s.replace(" ", "T");
    d = new Date(normalized);
  } else {
    return "—";
  }

  if (!isFinite(d)) return "—";                     // invalid date guard

  return d.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
