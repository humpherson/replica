# Seed data

The starter ships a welcome page without service fixtures or application storage. Product sources are explicitly unspecified; use [PRODUCT-DESIGN](PRODUCT-DESIGN.md) and the current brief to define scenarios rather than inventing service research.

## Generated data contract

The [app-owned scaffold](../../prototype-scaffold.config.mjs) generates a JSON fixture at src/data/seeds/<slug>.json and a typed loader at src/routes/<slug>/loader.ts. The [seed template](../../scaffold-templates/neutral/seed.json) and [loader template](../../scaffold-templates/neutral/loader.ts) define the actual schema and derived view model. Read generated files before editing; do not treat template values as service requirements.

Keep raw authored inputs in the fixture and derived counts in the loader. Preserve unrelated records, stable sibling IDs and authored ordering. Route adapters pass assembled data into presentation pages. Do not add persistence, live data or retries merely because a generated placeholder lacks them.

## Scenarios and evidence

Use synthetic data. Explicitly agree required normal, empty, invalid, loading and recovery scenarios when a task needs them. Empty content is not a substitute for malformed input or failed loading. A valid JSON file does not prove a service rule, source fidelity or runtime schema validation.

Test changed assembly and the important page connections through their public interfaces. Check retained data, derived counts and navigation when relevant. Rendering a generated example does not establish support for arbitrary service scenarios. Commands belong to [REPOSITORY](REPOSITORY.md); rendered verification belongs to [BROWSER-VALIDATION](BROWSER-VALIDATION.md).
