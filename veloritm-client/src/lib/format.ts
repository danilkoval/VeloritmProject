/**
 * Format a UAH amount deterministically across Node and browser ICU.
 * Using `style: "currency"` would render "₴" on Node 24 but "грн" in Chrome —
 * causing React hydration mismatches. We format the number ourselves and
 * append the ₴ glyph so server and client always agree.
 */
export const formatUAH = (value: number) => {
  const rounded = Math.round(value);
  const grouped = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const signed = rounded < 0 ? `-${grouped}` : grouped;
  return `${signed} ₴`;
};

export const formatDate = (date: string | Date) =>
  new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(typeof date === "string" ? new Date(date) : date);
