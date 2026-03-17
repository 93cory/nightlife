export function formatXAF(amount: number): string {
  return amount.toLocaleString("fr-FR").replace(/,/g, " ") + " XAF";
}

export function formatXAFShort(amount: number): string {
  if (amount >= 1_000_000) return Math.round(amount / 1_000_000) + "M";
  if (amount >= 1_000) return Math.round(amount / 1_000) + "K";
  return String(amount);
}

export function formatPrice(amount: number): string {
  return amount.toLocaleString("fr-FR").replace(/,/g, " ");
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "à l'instant";
  if (diffMin < 60) return `il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `il y a ${diffH}h`;
  return `il y a ${Math.floor(diffH / 24)}j`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
