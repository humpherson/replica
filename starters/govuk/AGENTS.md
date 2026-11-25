# Working on GOV.UK

Read [shared Replica instructions](REPLICA-AGENTS.md) before prototype work. This file owns the GOV.UK starter's app conventions. Active design and repository guidance is in [.agents/context](.agents/context/DESIGN-SYSTEM.md).

## App and commands

This app uses React, TypeScript, Vite, TanStack hash routing and the exact GOV.UK Frontend dependency declared in [package.json](package.json). Reuse a Node installation matching its engines before `npm ci` and `npm run dev`. Open the actual printed URL and follow the Replica canvas preflight in REPLICA.md.

Run `npm run check:starter` for formatting, types, tests and the production build. Use focused checks while iterating. `npm run format` writes double quotes, no semicolons and trailing commas. Tests use Vitest and jsdom; Vite asset and scaffold tests also build temporary applications. Rendered checks remain separate.

## Components and routing

Keep React StrictMode and the existing history adapter. Route modules own loading and navigation. Route adapters pass typed props to presentation pages, which do not import the router. Use kebab-case component directories, index.tsx, colocated types.ts and styles when needed. Use @app/, @routes/ and @data/ across top-level areas and relative imports within an area.

The root route supplies the only GovukPage shell and main landmark. Pages and generated scaffold content must not add another shell or main. Reuse the Button and ErrorSummary wrappers in src/app/govuk where applicable. ErrorSummary disables automatic focus: the caller owns repeated validation focus and document error titles. Skip links preserve the route hash. Do not initialize GOV.UK globally over already enhanced wrappers or invent a generic destroy API.

Read [the app guide](README.md) for the route scaffolder. Its engine and templates belong to this app; do not change another starter. Inspect installed provider APIs and active guidance before extending wrappers. Additional dependencies and custom component replacements follow the shared approval rules.

## Product guidance

The active context is a reusable GOV.UK design-system baseline. It defines no particular service, eligibility, payment, storage or research findings. Use the current task brief for those decisions. Use /setup-skills when the user requests additional product or design-system guidance, preserving reviewed guidance until replacement drafts are approved.
