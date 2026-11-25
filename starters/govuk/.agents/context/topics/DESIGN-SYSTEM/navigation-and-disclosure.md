# Navigation and disclosure

Read for ordinary links/actions or when selecting/composing a navigation or disclosure pattern. Common authority and gaps remain in [DESIGN-SYSTEM.md](../../DESIGN-SYSTEM.md). Product owns destinations and whether users need navigation; no service information architecture is selected.

## Standalone links and actions

For a standalone destination within the existing structure, use a real `<a href="…">` with `govuk-link`; preserve a meaningful URL, keyboard activation and focus. Do not replace it with a click-only span/button. Conversely, use a real button for actions such as submitting or adding something, with explicit type. Changing one standalone link does not require adopting tabs or menus.

From [Links](https://design-system.service.gov.uk/styles/links/):

- Links are underlined by default. `govuk-link--no-underline` is only appropriate
  where context already identifies navigation. `--no-visited-state` is for cases
  where visited state is unhelpful, such as frequently changing dashboards.
- Link text identifies its destination; name an external organisation where
  useful, rather than adding an external-link icon.
- Avoid new tabs. If necessary, say “opens in new tab” and use
  `target="_blank" rel="noreferrer noopener"`. Hidden contextual words may avoid
  visual repetition when a visible group instruction already explains this.
- `govuk-link--inverse` is for dark backgrounds; verify at least 4.5:1 contrast.
  A white token or modifier name does not establish contrast on custom surfaces.
- In-page href fragments must be coordinated with the app's hash router; do not
  ship placeholder `href="#"` links copied from examples as real destinations.

From [Button](https://design-system.service.gov.uk/components/button/):

- Main actions use `govuk-button[data-module="govuk-button"]`; secondary actions
  use `govuk-button--secondary`. Avoid multiple competing primary actions.
  Group related actions with `govuk-button-group` (stacks on narrow screens,
  wraps/aligned layout at larger sizes).
- Use sentence-case action wording matching what really happens. Do not promise
  saving with “Save and continue” if the prototype does not save.
- The documented **start button exception** is an anchor:
  `class="govuk-button govuk-button--start" role="button" draggable="false"`
  with data-module, real destination and supplied decorative arrow SVG. The
  Button JS supplies Space activation for role=button anchors. This exception
  does not make arbitrary navigation links buttons.
- Warning buttons are only for serious destructive consequences that cannot
  easily be undone; generally a final confirmation step, not every delete icon.
  Context/text must explain consequences without relying on red. Product must
  define the actual consequences and confirmation flow.
- Disabled buttons have poor contrast/can confuse users; use only with research.
  The provider's one-second double-click prevention is not a loading state.

## Choosing navigation

| Need | Provider contract and limits |
| --- | --- |
| Website hierarchy | Breadcrumbs: `nav.govuk-breadcrumbs[aria-label="Breadcrumb"]`, ordered list with `__list-item`/`__link`. Start at home, end at current page's parent. Before main, not progress through a transaction. `--collapse-on-mobile` shows only first/last for long trails. Inverse variant needs >=4.5:1 contrast. |
| Service-wide non-linear sections | ServiceNavigation with links; header is for GOV.UK-wide identity/tools, not a second service menu. Use for repeated multi-task services with no clear end-to-end order; simplify the journey first. Do not introduce it solely because a component exists. |
| Related content on the same page | Tabs under the constraints below, never service/page navigation. |
| Side navigation or action menu | No dedicated GOV.UK Frontend 6.6.0 primitive/complete keyboard contract was established in the scoped catalogue/detail research. A styled list may use semantic nav/list/links where appropriate, but do not invent provider SideNav/Menu exports or ARIA menu behavior. Name any custom scope and obtain the required design/approval before proceeding. |

[Breadcrumbs](https://design-system.service.gov.uk/components/breadcrumbs/), [Navigate a service](https://design-system.service.gov.uk/patterns/navigate-a-service/), [Service navigation](https://design-system.service.gov.uk/components/service-navigation/). The navigation pattern says external **menu** links should usually be grouped after internal links and open in a new window, while general Links discourages new tabs. This is composition-specific guidance, not permission to open every external link differently; consider body links and preserve warnings when needed.

For ServiceNavigation, preserve `.govuk-service-navigation[data-module="govuk-service-navigation"]`, its width/container structure, labelled nav and native toggle button:

```html
<button type="button"
  class="govuk-service-navigation__toggle govuk-js-service-navigation-toggle"
  aria-controls="navigation" hidden aria-hidden="true">Menu</button>
<ul class="govuk-service-navigation__list" id="navigation">…</ul>
```

The official initial list is visible without JS. With enhancement, the toggle appears below tablet and controls hidden/aria-expanded; at tablet it is hidden and links are visible. Button Enter/Space and ordinary link Tab/Enter semantics apply; this is **not** an overlay or ARIA action menu with focus trapping. An active item uses `__item--active`, link `aria-current="true"` and `strong.govuk-service-navigation__active-fallback`; an exact current-page link can use `aria-current="page"` when that meaning applies. Update active state on route changes without reconstructing overlapping JS instances. IDs must match and remain unique. Custom slots require their own styles/JS and validation. Media-query listeners have no complete provider disposal API.

## Details and accordions

Hidden content must not be the only way most users can find essential information. Avoid nesting Details, Accordion and Tabs within one another.

**Details:** use for a single short section only some users need. Preserve native `details.govuk-details > summary.govuk-details__summary`, inner `span.govuk-details__summary-text` and `.govuk-details__text` content. This is native disclosure: Tab reaches summary, Enter/Space toggles, then focus can reach revealed content. No data-module/init or invented Details JS export is needed. Do not replace summary with an anchor. Keep its accessible text short and descriptive. Research notes say some users think it navigates away, and voice software/older VoiceOver interactions have known concerns. [Details guidance](https://design-system.service.gov.uk/components/details/).

**Accordion:** only with evidence that choosing/showing multiple related sections helps users. Test content without it first. It can support comparing sections; it is not for a series of form questions, content everyone needs, nested accordions or excessively heavy content.

Preserve the official initial structure:

```html
<div class="govuk-accordion" data-module="govuk-accordion" id="unique-accordion">
  <div class="govuk-accordion__section">
    <div class="govuk-accordion__section-header">
      <h2 class="govuk-accordion__section-heading">
        <span class="govuk-accordion__section-button" id="unique-heading-1">
          Section heading
        </span>
      </h2>
    </div>
    <div class="govuk-accordion__section-content" id="unique-content-1">
      …
    </div>
  </div>
</div>
```

The JS creates section buttons/show-all control and expanded states. Enter/Space activates buttons; keep focus on usable controls and revealed content in normal order, not a modal trap. Match section heading level to the page. Summary lines must be brief: all text contributes to the accessible button name.

Without JS all content is shown. On initial enhanced display sections normally start closed; `__section--expanded` can open one. By default open state is remembered in sessionStorage: use a unique accordion ID across the service's domain. `{ rememberExpanded: false }` or documented `data-remember-expanded="false"` disables that provider disclosure memory; it is not an application data-retention policy. Do not disable empty sections: remove them, or explain absence in their opened content if removal would confuse.

[Accordion guidance](https://design-system.service.gov.uk/components/accordion/) still identifies questions about elements-list navigation and long summaries; successful use elsewhere is not service-specific research. Its DOM rewriting and document listener must be accounted for by any React wrapper.

## Tabs

Choose tabs only when labelled related sections can be viewed one at a time, first section is most useful and users do not need ordered reading or cross-tab comparison. Prefer content without hiding when possible. Do not disable empty tabs: remove or explain empty content. Keep labels short enough not to wrap.

Use `.govuk-tabs[data-module="govuk-tabs"]`, `.govuk-tabs__title`, `ul.govuk-tabs__list`, `li.govuk-tabs__list-item`, anchors `__tab[href="#panel-id"]` and matching `div.govuk-tabs__panel[id]` as in the [HTML example](https://design-system.service.gov.uk/components/tabs/). Begin each panel with a heading duplicating its tab label for small screens and screen-reader navigation. Preserve the supplied initial selected/hidden classes.

At tablet and wider, 6.6.0 JS supplies tablist/tab/tabpanel roles, selection, aria-controls/labelledby and roving tabindex. Left/Right move to adjacent tabs and select/focus them; at ends the pinned implementation does not wrap. Do not invent Up/Down bindings (removed in 5.5.0), Home/End support or a focus trap. On small screens or without JS, content is shown in order with a contents list of anchors, not a horizontally scrolling tab strip.

**Hash-route blocker:** the provider uses the URL fragment for selection/history and writes window.location.hash. Its default behavior competes with TanStack hash routes. Do not adopt unchanged tabs without explicit coordination and verification of route state, deep linking, anchors and browser back/forward. Its `teardown()` is breakpoint switching, not complete unmount cleanup.

The current guidance explicitly says “This component has not yet been tried in research with users”, while drawing on recommendations and examples in other services. Further research is needed on service suitability, keyboard/screen readers and narrow behavior. Do not replace this qualification with a blanket “GOV.UK-tested therefore suitable” claim.

## Overlays and gaps

No authorized evidence established a complete modal, popover, toast or action-menu API, focus trap, Escape dismissal or focus-return contract in this pinned system. A modal mentioned in a technical example is not a supplied component. If such a pattern is requested, identify the missing contract and approved custom scope; do not repurpose Details/ServiceNavigation as an overlay. Dialog failure handling and return focus remain unverified until an actual implementation is selected.
