import { SkillGroup } from "./types";
import { tag } from "./utils";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Core",
    tags: [
      tag("TypeScript", "daily use · strict mode · ~3 years"),
      tag("React 18", "primary framework · personal projects + OI · 4+ years"),
      tag("Vite", "build tool · replaced CRA, never looking back"),
      tag("pnpm + Turborepo", "monorepo tooling · learned on the job"),
      tag("ESLint + Prettier", "every project · non-negotiable at this point"),
    ],
  },
  {
    label: "UI & Design",
    tags: [
      tag("MUI v6", "primary UI library · components, charts, date pickers"),
      tag("Emotion", "CSS-in-JS · used alongside MUI"),
      tag("Figma", "wireframing + design handoff · used since HairTimeline"),
      tag(
        "Internal design system",
        "MUI-based · contributed from early on at OI",
      ),
      tag("Storybook v8", "component documentation · used for design system"),
    ],
  },
  {
    label: "State & Data",
    tags: [
      tag(
        "TanStack Query v5",
        "server state management · production use · daily",
      ),
      tag("Axios", "HTTP client · used across all projects"),
      tag("WebSockets", "real-time data · asyncAPI spec · react-use-websocket"),
      tag("MSW v2", "API mocking · used heavily during development"),
      tag(
        "TanStack Table v8",
        "complex data tables · more powerful than it looks",
      ),
    ],
  },
  {
    label: "Forms & Validation",
    tags: [
      tag(
        "react-hook-form",
        "form management · performant, minimal re-renders",
      ),
      tag("Zod", "schema validation · paired with react-hook-form"),
    ],
  },
  {
    label: "Maps & Geo",
    tags: [
      tag(
        "ArcGIS / ESRI",
        "the one you learn because the ocean is involved · OI · ~3 year",
      ),
    ],
  },
  {
    label: "Auth",
    tags: [
      tag("Azure AD / MSAL", "enterprise auth · msal-browser + msal-react"),
    ],
  },
  {
    label: "Testing",
    tags: [
      tag("Vitest", "unit testing · fast, works great with Vite"),
      tag("React Testing Library", "component testing · user-event included"),
    ],
  },
  {
    label: "Previously",
    muted: true,
    tags: [
      tag("Python / Django", "CS50W + HairTimeline · where it all started"),
      tag("Flask", "CS50X final project · Finance stock simulator"),
      tag("AWS S3", "HairTimeline · one very long week"),
      tag("PostgreSQL", "HairTimeline + CS50W projects"),
      tag("SASS", "early projects · now mostly CSS-in-JS"),
    ],
  },
  {
    label: "Other Skills",
    tags: [
      tag(
        "Self Hair Dying",
        "HairTimeline was not just a project · it was a lifestyle",
        "fun",
      ),
      tag(
        "Pickled Onions",
        "homemade · highly recommended · recipe not included",
        "fun",
      ),
      tag("Karaoke", "professional level · no stage fright whatsoever", "fun"),
      tag("Guitar", "intermediate · mostly plays the same 4 chords", "fun"),
      tag("Drawing", "occasional · mostly portraits · sometimes good", "fun"),
      tag("Baking", "stress-induced · output quality: not bad", "fun"),
    ],
  },
];
