export function uniqueEmail(prefix: string): string {
  const ts = Date.now();
  const rand = Math.floor(Math.random() * 10000);
  return `${prefix}+${ts}${rand}@example.com`;
}

export const currencyToNumber = (value: string): number => {
  // Ex: "$1,234.56" or "1,234.56"
  const cleaned = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned);
};