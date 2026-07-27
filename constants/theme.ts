export const CATEGORIES = [
  "All",
  "Robbery",
  "Fire Outbreak",
  "Medical Emergency",
  "Accident",
  "Suspicious Activity",
  "Domestic Threat",
] as const;

export const STATUS_STYLES: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  Active: { bg: "bg-coral-light", text: "text-coral", dot: "bg-coral" },
  Responding: { bg: "bg-amber/20", text: "text-amber-dark", dot: "bg-amber" },
  Resolved: { bg: "bg-teal-light", text: "text-teal", dot: "bg-teal" },
};

export const SEVERITY_ORDER: Record<string, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};
