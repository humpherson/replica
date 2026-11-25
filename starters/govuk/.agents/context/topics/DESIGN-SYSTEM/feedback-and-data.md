# Feedback and data presentation

Read for ordinary notices, pending/empty/failure states, confirmation, tables, images or charts. Common authority and gaps remain in [DESIGN-SYSTEM.md](../../DESIGN-SYSTEM.md). Presentation guidance does not create service rules, persistence, recovery promises or contact details.

## Select feedback by relevance and scope

| Situation | Documented presentation and limits |
| --- | --- |
| Invalid submitted answer | Field Error message **and** top Error summary, including focus and matching links/wording. Do not replace with banner/toast. |
| Important information directly relevant to this page's task | Main content; Inset text or Warning text where justified, not an unrelated top notice. Read the chosen component's full detail before adding it. |
| Relevant information elsewhere/service-wide, while this page remains usable | Neutral Notification banner, used sparingly. |
| Expected action completed but overall journey continues | Success Notification banner can confirm the result, especially in non-linear services. |
| Completed linear transaction | Confirmation page/panel, not a success banner as a replacement for completing the journey. |
| Unexpected problem preventing service use | “There is a problem with the service” page. |
| Service intentionally closed | Service unavailable page, not a validation error. |
| Only one region fails, pending update, or generic empty state | No complete provider recipe was established. Do not equate this with whole-service outage or claim a selected toast/skeleton/status component exists. Resolve the applicable task-specific presentation contract. |

Sources: [Notification banner](https://design-system.service.gov.uk/components/notification-banner/), [Error message](https://design-system.service.gov.uk/components/error-message/), [problem page](https://design-system.service.gov.uk/patterns/problem-with-the-service-pages/), [unavailable page](https://design-system.service.gov.uk/patterns/service-unavailable-pages/).

## Notification banners

Use the documented structure:

```html
<div class="govuk-notification-banner"
  role="region" aria-labelledby="notice-title"
  data-module="govuk-notification-banner">
  <div class="govuk-notification-banner__header">
    <h2 class="govuk-notification-banner__title" id="notice-title">Important</h2>
  </div>
  <div class="govuk-notification-banner__content">…</div>
</div>
```

Place immediately before the page h1, at the same content width as the page. Prefer one banner, combine compatible messages or show the highest priority. Do not show it alongside an Error summary: show the summary instead. Its heading names the region; IDs must be unique. Use `govuk-notification-banner__link` for links in it.

A success banner adds `govuk-notification-banner--success`, uses `role="alert"` and an explicit consistent title such as “Success”, not colour alone. Remove it on moving to a new page. In 6.6.0, constructor auto-focus occurs only with role=alert and `disableAutoFocus` false (default). Region banners do not take focus automatically. There is no built-in dismiss button, timeout or return-focus API; official guidance says dismissibility still needs research. Do not add auto-expiring success/error feedback by analogy with a toast.

Banners are often missed, including by people navigating straight to h1. They are not reliable substitutes for information essential to the current task. Repeated/dynamic alert focus and SPA route focus must have one coordinated owner; verify live-update behavior in the affected implementation.

Source: [banner detail/research](https://design-system.service.gov.uk/components/notification-banner/) and pinned [NotificationBanner](https://github.com/alphagov/govuk-frontend/blob/v6.6.0/packages/govuk-frontend/src/govuk/components/notification-banner/notification-banner.mjs).

## Pending, empty, degraded and failure states

[Button guidance](https://design-system.service.gov.uk/components/button/) mentions giving loading feedback on slow connections, for example a spinner or modal, but supplies no universal spinner/modal API or complete pending-state contract. Its optional one-second double-click debounce is not a request-lifetime indicator and does not establish what happened to a submission.

For an asynchronous region, evidence remains missing for the exact loading indicator, status/live-region attributes, announcement timing, focus retention, retry behavior and usable-content preservation. These must be explicitly designed and tested for the affected task before readiness; don't replace all useful page content with an outage page merely because one fetch failed. The provider's relevance rule supports keeping task-related information in main content, but is not a complete partial-failure recipe. No generic EmptyState component or no-results recovery policy is selected. Explain absence accurately rather than showing fabricated successful data; the product brief must define available actions and what “empty” means.

Whole-service patterns do provide specific page contracts:

- Unexpected blocking failure: title
  “Sorry, there is a problem with the service – service name – GOV.UK”, matching
  h1, and “Try again later.” Supply truthful information about answers, useful
  real support and alternatives **if they exist**. Avoid breadcrumbs, red warning
  text, error-code jargon and “technical difficulties”.
- Intentional closure: title/h1 “Sorry, the service is unavailable”, with known
  reopening details or appropriate next steps. Do not invent a date. Again,
  explain answer state and real support where applicable, no breadcrumbs/red text.

The examples' “We saved your answers ... 30 days” and helpline details are illustrations, **not** reusable storage/support policy. Product sources were skipped; neither saving nor safe retry nor retention is established. A technical failure is not an input-validation error or evidence of lost/saved answers.

Sources: [unexpected failure](https://design-system.service.gov.uk/patterns/problem-with-the-service-pages/), [intentional unavailability](https://design-system.service.gov.uk/patterns/service-unavailable-pages/). No complete provider dialog contract was established: if a dialog is selected later, its internal error announcement, focus retention/return and dismissal rules remain explicit implementation gaps, not inherited from these pages.

## Panels

The [Panel](https://design-system.service.gov.uk/components/panel/) is only for confirmation or interruption pages, not general coloured cards/emphasis. Confirmation markup uses `.govuk-panel.govuk-panel--confirmation`, `.govuk-panel__title` as the journey-outcome heading and `__body` for brief details. Keep text concise so references/headings wrap usefully on narrow/zoomed screens. The interruption variant has distinct actions/markup: consult its complete example if needed. No JavaScript Dialog/Panel API or focus trap follows from this visible container.

## Tables, charts and images

[Table guidance](https://design-system.service.gov.uk/components/table/) supports comparing rows/columns, never page layout. Use native table/caption/thead/tbody, `govuk-table`, `__row`, `__header` and `__cell` classes. Describe the table in a caption; use th `scope="col"`/`"row"` so headers remain meaningful. Align compared numbers with `govuk-table__header--numeric`/`__cell--numeric`, not spaces in text. Column width utilities do not implement sorting, pagination or narrow overflow. No such behavior is implied by this markup. Check long content and narrow/zoomed reading; product-specific density/overflow decisions are not supplied here.

No chart-rendering component/library was selected or found in the scoped pinned catalogue. That is **not** absence of chart accessibility guidance: [Images](https://design-system.service.gov.uk/styles/images/#text-in-charts-diagrams-and-complex-images) explicitly says consider a table/text alternative; provide short alt describing meaning/context and a visible longer description for complex information. Accessible charts must make their data available as text. A picture with only “chart” as alt, or an unimplemented promise of a following table, is insufficient.

Use images only for an evidenced need, not decoration by default. All img elements need an alt attribute; use empty alt where decorative or repeating an adjacent label. Retain visible text needed to complete the task. Any interactive chart would also need keyboard, names/states and focus contracts for the actual chosen implementation; no hover-only tooltip exemption or supported interaction API has been established.
