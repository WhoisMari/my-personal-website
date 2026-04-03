import { SkillTag, TagVariant } from "./types";

const HIGHLIGHT = new Set([
  "TypeScript",
  "React 18",
  "Vite",
  "MUI v6",
  "TanStack Query v5",
  "ArcGIS / ESRI",
]);

export function tag(label: string, tooltip: string, variant?: TagVariant): SkillTag {
  return {
    label,
    tooltip,
    variant: variant ?? (HIGHLIGHT.has(label) ? "highlight" : "default"),
  };
}
