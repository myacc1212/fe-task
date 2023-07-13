export type RefreshInterval = "5" | "10" | "15" | "30" | "60";

export const REFRESH_INTERVALS = [
  { value: "5", label: "5 seconds" },
  { value: "10", label: "10 seconds" },
  { value: "15", label: "15 seconds" },
  { value: "30", label: "30 seconds" },
  { value: "60", label: "60 seconds" },
];

export const DEFAULT_REFRESH_INTERVAL = "5";
