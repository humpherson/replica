# Tokens and style evidence

Read for styling decisions, semantic colours, spacing/type or custom CSS. Common authority and validation limits remain in [DESIGN-SYSTEM.md](../../DESIGN-SYSTEM.md). Primary authority is the official **6.6.0 Sass API/source**, not community JSON or remembered v5 values.

## Supported source and consumption

Use existing component and override classes when consuming precompiled CSS. No token processor or alternate theme is selected. If custom rules require the Sass API, check current tooling; propose and obtain approval for any new dependency before adding it. API-only import, once available and build-path resolved:

```scss
@use "node_modules/govuk-frontend/dist/govuk/base" as *;

.app-example {
  color: govuk-functional-colour("text");
  @include govuk-font($size: 19);
  @include govuk-responsive-margin(6, "bottom");
}

.app-example:focus {
  @include govuk-focused-text;
}
```

This illustrates the API, not a required new component or an executed compile. `index.scss` forwards base and includes core, objects, components, utilities and overrides; `base` forwards settings/tools/helpers and button settings without full component CSS. Each Sass file using the API needs its own `@use`.

Sources: [Sass API](https://frontend.design-system.service.gov.uk/sass-api-reference/), [include CSS](https://frontend.design-system.service.gov.uk/include-css/), [pinned source](https://github.com/alphagov/govuk-frontend/tree/v6.6.0/packages/govuk-frontend/src/govuk). Never import private Sass maps as an application token API merely because they can be read for verification.

## Semantic colour and focus

Prefer `govuk-functional-colour("text")`, `"secondary-text"`, `"link"`, `"link-hover"`, `"link-visited"`, `"border"`, `"input-border"`, `"focus"`, `"focus-text"`, `"error"`, `"success"` and the appropriate surface role **for the documented purpose only**. If the use is not semantic error/success/etc., `govuk-colour("red")` or another palette colour/variant is the correct category, not abusing an error role to obtain red. Do not hardcode a historical hex inventory. Functional colours emit CSS custom-property references with fallbacks. Legacy applied variables, such as `$govuk-text-colour`, are deprecated in 6.6.0.

Examples of identity, not a substitute for semantic APIs: brand blue remains `#1d70b8`, but functional link is **#1a65a6**; red/error **#ca3535** and green/success **#0f7a52** reflect the refreshed palette. Pre-brand names such as dark-grey map to new palette variants with deprecation warnings, not their old values. The live colour guide and installed source agree on these refreshed functional defaults.

Preserve component focus recipes. `govuk-focused-text` combines transparent outline, yellow background and shadows `0 -2px` yellow / `0 4px` black; `govuk-focused-box` uses yellow/black spreads **4px/8px** plus transparent outline; form input focus uses **3px** yellow outline plus an inset input-border shadow. These are not interchangeable generic rings. Button focus has its own states. Transparent outlines matter when forced colours removes backgrounds/shadows.

Use GOV.UK's standard theme only. Documented Sass configuration mechanics exist, but neither configuring `$govuk-functional-colours` nor CSS custom properties authorizes a theme change. NHS/MoJ/MoneyHelper overrides are explicitly excluded. Token values do not guarantee contrast. Verify actual text/surface, hover/visited/focus/error and custom combinations; inverse link/button guidance requires at least 4.5:1 with the background.

Sources: [Colour](https://design-system.service.gov.uk/styles/colour/), [focus](https://design-system.service.gov.uk/get-started/focus-states/), installed `settings/_colours-functional.scss`, `_colours-palette--internal.scss`, `helpers/_colour.scss` and `_focused.scss`. The focus page links an older source commit for its no-Sass example: use the pinned helper for version details.

## Spacing, typography and borders

- Responsive spacing: `govuk-responsive-margin`/`padding`, or
  `govuk-!-margin-bottom-6`-style classes. Unit 6 means 20px on small screens,
  30px from tablet; unit 9 means 40px/60px. Units 0–3 do not change.
- Static spacing: `govuk-spacing(6)` or `govuk-!-static-margin-bottom-6` stays
  30px. Do not confuse a matching static JSON number with responsive behavior.
  Keep the spacing owned by a component unless a documented override is needed.
- Typography: use semantic classes first. `govuk-font($size: 19)` also sets font
  family/weight; `govuk-font-size` changes only size/line-height. GDS Transport,
  arial, sans-serif is the screen stack; weights 400/700. Keep font assets and
  user scaling intact, and do not set html font-size to force smaller type.
- In 6.6.0 body is 19/25px and small body 16/20px at all screen sizes. Heading
  points 24/36/48 are respectively 21/25, 27/30, 32/35 on small screens and
  24/30, 36/40, 48/50 from tablet. Output is in relative units.
  Point 14 was removed in v6; 53 is the small-screen size of exceptional point80,
  not a new normal heading level. Don't restore the retired typography feature
  flag or assign heading semantics solely from numeric size.
- Pinned measurement roles: standard border 5px, narrow 4px, wide 10px, form
  control 2px, error-group 5px and focus outline 3px. These names do not map to
  the community's generic “narrow/standard/thick” roles.
- Breakpoint source is mobile 320px, tablet 641px, desktop 769px; use provider
  responsive classes/helpers, not device detection. Content width is 960px
  (see root's live-layout qualification), gutters 30px and small side margins
  15px with safe-area handling.

Sources: [Spacing](https://design-system.service.gov.uk/styles/spacing/), [Type scale](https://design-system.service.gov.uk/styles/type-scale/), [v6 update](https://design-system.service.gov.uk/get-started/new-type-scale/), installed `settings/_spacing.scss`, `_typography-responsive.scss`, `_typography-font.scss`, `_measurements.scss`, `_media-queries.scss` and `helpers/_width-container.scss`.

## Supplementary community JSON: restricted reference

Inspected actual [`gds-tokens.json` at 78850654578d8658670f1ba3898802040bde84f2](https://github.com/Sulei-UK/GDS-Design-Tokens/blob/78850654578d8658670f1ba3898802040bde84f2/gds-tokens.json). The same revision's README calls it `master-tokens.json` and claims DTCG/import readiness. Those claims are **not verified conformance**.

The pinned JSON has 97 token leaves, 78 in `GDS-Tokens`. Roots include `GDS-Tokens`, three `sub/*Theme` sets, `$themes: []` and `$metadata` selecting the base set. All **46** exact aliases resolve only after treating `GDS-Tokens` as a selected root: for example `{govuk.colour.black}` does not resolve from the literal document root, where the path is `GDS-Tokens.govuk.colour.black`. A tool would need defined set semantics.

Actual `$type` values include `color`, `spacing`, `fontFamilies`, `fontWeights`, `fontSizes`, `number`, `typography`, `borderWidth`, `shadow`. Dimensions are mostly unit strings; shadow dimensions use unitless strings; typography composites use plural field names and font aliases inside arrays. Neither a JSON parse nor the README badge establishes compatibility with a particular DTCG revision/tool. **Schema conformance and design-tool compatibility remain unverified; no processor is selected.**

Material mismatches, not an exhaustive replacement token inventory:

| Community reference | Official 6.6.0 |
| --- | --- |
| error #d4351c / button green #00703f | #ca3535 / #0f7a52 |
| default link #1d70b8 / hover #003078 / visited #4c2c92 | #1a65a6 / #0f385c / #54319f |
| secondary #505a5f / border #b1b4b6 / light-grey #f3f2f1 | #484949 / #cecece / black tint-95 #f3f3f3; default surface #f4f8fb |
| spacing points as fixed 0–60px | Static values match; responsive reductions missing |
| 14 and 53 as independent font sizes | Removed point14; 53 belongs to point80 small-screen rendering |
| size24 described “Heading S”, size27 “Heading M” | Official heading-s point19 / heading-m point24; JSON's own composite heading-m uses24 |
| heading-xl line-height1.11111 / heading-l1.2 | Tablet48/50 (~1.04167) /36/40 (~1.11111), plus different small values |
| narrow border1px / standard2px | Provider narrow4px / standard5px; 2px is form control |
| button shadow y3, #002d18 | y2px, #083d29 |
| focus ring spreads3/5 | Focused-box4/8; text/input recipes are different again |

Primary yellow #ffdd00, black #0b0c0c, white #ffffff, font family and 400/700 weights match their corresponding screen values, not every derived semantic use. Do not import/flatten this JSON to override official styles, or enable its alternate sets. It remains supplementary historical/design-tool reference with disclosed mismatches; official pinned Sass wins.

## Validation limits

No token linter/style validator has been selected. Sass source evidences errors for unknown colour/variant/functional names; it cannot establish rendered contrast, focus visibility, target size, CSS fidelity or WCAG compliance. When styles change, compare their actual inputs/output against 6.6.0 and obtain relevant rendered evidence; do not report the JSON parse or a future compile as a visual/accessibility pass.
