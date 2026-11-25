# Forms

Read for normal field selection/composition, labels, legends, errors and submission states. Common contracts remain in [DESIGN-SYSTEM.md](../../DESIGN-SYSTEM.md); these are HTML contracts, not an installed React wrapper API.

## Fields, labels and grouped questions

- Use `.govuk-form-group` around each question. Text input is for one line;
  use the documented Textarea for multiline answers. Keep label above the
  control, short, direct and sentence case, without a trailing colon.
- Every input needs an associated label; it should normally be visible.
  `htmlFor` must match the input's unique `id`. Placeholder text must not
  replace a label, hint or example.
- Use `fieldset.govuk-fieldset` to group related controls; its **first element**
  must be the describing `legend`. Group names do not replace individual
  input labels. Preserve the examples' hint/error `aria-describedby` IDs.
- On a single-question page, use the question as the heading without duplicate
  screen-reader text: `<h1 class="govuk-label-wrapper"><label ...>…</label></h1>`
  for one input; `<legend ...><h1 class="govuk-fieldset__heading">…</h1></legend>`
  inside fieldset for grouped inputs. Label and legend nesting are different.
  On multiple-question pages use one separate page heading, not h1 per field.
- Mark optional questions in visible text with “(optional)” where applicable.
  Do not infer which data is required from the component. The official validation
  pattern says not to add `required`; use `<form noValidate>` in JSX to turn off
  browser HTML5 validation when implementing that pattern.
- Size controls to expected input. Use `govuk-input--width-10`-style fixed
  character widths for known-length content; they shrink if wider than the
  viewport. Fluid widths follow their container; don't replace them with an
  unbounded fixed pixel width. Preserve content-appropriate type/inputMode and
  autocomplete from the relevant pattern, not a universal text/number default.

Sources: [Text input](https://design-system.service.gov.uk/components/text-input/), [Fieldset](https://design-system.service.gov.uk/components/fieldset/), [labels/legends/headings](https://design-system.service.gov.uk/get-started/labels-legends-headings/), [validation](https://design-system.service.gov.uk/patterns/validation/).

Example of **error-state markup**, not a complete component or validation rule:

```tsx
<div className="govuk-form-group govuk-form-group--error">
  <label className="govuk-label" htmlFor="full-name">Full name</label>
  <div id="full-name-hint" className="govuk-hint">
    Enter your first and last name
  </div>
  <p id="full-name-error" className="govuk-error-message">
    <span className="govuk-visually-hidden">Error:</span>{" "}
    Enter your full name
  </p>
  <input
    className="govuk-input govuk-input--error"
    id="full-name"
    name="full-name"
    type="text"
    autoComplete="name"
    aria-describedby="full-name-hint full-name-error"
  />
</div>
```

A wrapper must preserve the submitted value and remove the error class, message and error ID reference when no longer invalid. Retain any hint association. No `aria-invalid` prop is invented as a substitute for the provider error markup.

## Radios, checkboxes and conditional questions

Use radios for one choice and checkboxes for multiple choices. Preserve native inputs, shared group name, distinct values/IDs and associated labels:

- `.govuk-radios[data-module="govuk-radios"]` with `__item`, `__input`, and
  `.govuk-label.govuk-radios__label`; corresponding checkbox classes for multiple
  selection. Include fieldset/legend and selection hint where needed.
- Do not preselect a radio answer merely to satisfy a required question.
  Previously provided answers are a different state. Include “None of the above”
  or “I do not know” only when valid for the question; provider examples do not
  establish service options.
- Native radio arrow/Space and checkbox Space behavior must remain available;
  labels provide click targets. Tab order is not a custom roving-focus API.
- Standard-sized choices are the normal provider guidance. Small variants may
  suit less-prominent filters in dense/repeat-use services, not an automatic
  way to compress every form. Check actual labels, targets and reflow.
- Conditional reveal uses input `data-aria-controls="conditional-id"` and the
  corresponding `govuk-radios__conditional` or checkbox conditional block.
  JS promotes that data attribute to `aria-controls`, synchronizes
  `aria-expanded` and visibility. Preserve checked state when redisplaying a
  revealed field's error; summary links must lead to the visible invalid input.
- Reveal only simple related **questions**, not unrelated notices/content.
  Complex/multipart questions belong on a following page. Do not attach
  conditional questions to inline radios.
- **Known limitation:** current official radio/checkbox pages say users are not
  always notified when content appears/disappears, failing WCAG 4.1.2. Their
  research found simple questions usable but complex ones confusing. Preserve
  this qualification; a working JS toggle does not resolve it or certify AA.

Sources: [Radios](https://design-system.service.gov.uk/components/radios/), [Checkboxes](https://design-system.service.gov.uk/components/checkboxes/), and pinned JS under [components](https://github.com/alphagov/govuk-frontend/tree/v6.6.0/packages/govuk-frontend/src/govuk/components). Their global pageshow listeners and DOM mutation still need React lifecycle handling; verify that interoperation in the actual implementation.

## Validation and errors

When validation is in scope, follow the [Validation pattern](https://design-system.service.gov.uk/patterns/validation/):

1. Validate on attempted continuation/submission, not blur or while the user is
   still typing. Earlier validation is an exception needing research, such as
   character-limit feedback, not a general default.
2. Redisplay the page with **both passing and failing answers retained**. Prefix
   document title with `Error: `.
3. Place `.govuk-error-summary[data-module="govuk-error-summary"]` at the top of
   the page content, even for one error; include its inner `role="alert"`,
   h2 `.govuk-error-summary__title` “There is a problem”, body and linked list.
4. Move focus to the summary. Its 6.6.0 constructor does this unless
   `{ disableAutoFocus: true }`; disabling it needs deliberate alternative focus
   ownership, not a workaround for noisy effects.
5. Match summary wording exactly to the adjacent `.govuk-error-message`, with
   hidden “Error:” prefix, error form-group and appropriate invalid-input border.
   Place the error after question/hint and associate it using `aria-describedby`.
6. Summary href targets: the input for a single field; first invalid field in a
   composite (or first if unknown); first radio/checkbox for a choice group.
   Preserve labels/legends so JS scroll/focus handling can find the target.

Error text says what went wrong and how to fix it, using the question's wording. Don't use field errors for ineligibility, missing permissions, service failure or capacity problems users cannot correct. Those need explanatory page content. Actual eligibility, required fields and normalization/business rules belong to the service brief, not this document.

The provider's production requirement for server-side validation is not an instruction to build backend infrastructure for this reusable prototype. Conversely, do not claim client-only prototype checks provide production validation. MoJ's suggestion that prototypes usually need no validation is not an adopted fidelity rule.

Sources: [Error summary](https://design-system.service.gov.uk/components/error-summary/), [Error message](https://design-system.service.gov.uk/components/error-message/). On hash routes, verify summary anchors never replace the route; initialize after targets exist and coordinate repeated submission focus explicitly.

## Submission and specialist inputs

Use a real submit button for form submission and explicit `type="button"` for non-submit actions. Button text describes actual effects: “Continue” does not promise saving; “Save and continue” does. Avoid disabled buttons unless research shows benefit. The optional `data-prevent-double-click="true"` enhancement only debounces for one second in 6.6.0: it is **not** pending-request state, persistence, idempotency or recovery. Pending feedback and retry consequences still need the task's design and verification. See [Button](https://design-system.service.gov.uk/components/button/).

When selecting specialist inputs, read their complete applicable official detail and pinned implementation rather than extrapolating the example above:

- [Character count](https://design-system.service.gov.uk/components/character-count/):
  6.6.0 introduces `countType: "characters"` or `"words"` using Intl.Segmenter;
  unsupported browsers fall back to static description. Match actual counting
  rules/limits, not a fabricated backend policy. The
  [release](https://github.com/alphagov/govuk-frontend/releases/tag/v6.6.0)
  deprecates maxwords in favor of maxlength with countType=words.
- [File upload](https://design-system.service.gov.uk/components/file-upload/):
  native input example is not the enhanced control. Opt-in enhanced HTML needs
  `.govuk-file-upload-wrapper[data-module="govuk-file-upload"]` around the input,
  as in the pinned template; merely importing its class does not opt in.
  The documented Dragon concern/improvement must be considered, and document
  drag listeners need lifecycle handling. No upload service/policy is selected.

Normal, invalid, narrow, keyboard and screen-reader checks remain required for the actual chosen fields. Provider markup alone does not establish tested React wrappers.
