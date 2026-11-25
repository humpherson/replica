# Product design

## Authority and boundary

This is a reusable GOV.UK-based Replica starting point, not a selected service. Product research was explicitly skipped. There is no selected service, user journey, business logic, product research, approved concept or product viewport/support matrix. These are intentional evidence gaps, not findings that such requirements do not exist.

The saved product intake establishes the starting boundary; a later authorized task brief can supply the decisions relevant to that task:

> Skip product sources for now. This project is a reusable Replica starting point using GOV.UK Frontend 6.6.0. No specific service, user journey, business rules or research findings have been selected yet. Keep those gaps explicit. Do not invent product requirements or present GOV.UK design-system guidance as service-specific research. We’ll provide a brief when building the first prototype.

Source: [saved intake](../context-sources.json), `intake.product`, status `skipped`. This skip does not prohibit later task-specific product decisions or require reopening setup intake. Check the current brief before treating a gap as unresolved.

No provider documentation or application code was researched as a substitute for skipped product evidence. A component example, available feature or current implementation does not establish a service requirement, user need, permission or approved concept.

This document records the boundary and the decisions a future brief must resolve when relevant. It does not prescribe a service, introduce features or select business rules. No `proposed-default` recommendations are adopted or offered: there is no task context establishing their applicability. The bounded proposals in the product research template remain proposals, not starter requirements.

## Product principles, layout and supported conditions

Before making product tradeoffs for a specific prototype, identify its intended users, problem, core tasks, information priorities and the human or documented authority for those decisions. No such priorities have been supplied here; neither marketing language nor visual preference fills that gap.

Layout decisions remain task-dependent: hierarchy, browsing versus comparison, persistent shell, grouping, density and content-priority exceptions. This guidance does not select a task-page layout, navigation structure or numeric breakpoint. Required widths, narrow-screen navigation/tasks, overflow and truncation belong to [RESPONSIVE-DESIGN.md](./RESPONSIVE-DESIGN.md), not a duplicate matrix here.

Required themes and usage conditions are not established by the range of modes a provider offers. Browser, assistive-technology and language support requirements belong to [ACCESSIBILITY.md](./ACCESSIBILITY.md). A product preference cannot waive applicable accessibility criteria; an unselected support matrix is not an exemption or a compatibility claim.

The user's design-system constraint and implementation guidance belong to [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md). They are not service-specific product policy and are not restated here.

## Prototype fidelity and concept evidence

No approved reference, concept decisions or reusable fidelity policy has been supplied. A future build's goal, reference, requested deviation and acceptance inputs are task inputs, not missing setup answers to be fabricated now.

The product research template supplies this conditional authoring boundary: when a task explicitly supplies an approved reference, preserve it 1:1 except for the requested delta; other deviations need a user decision. Greenfield work need not have an upstream reference. This boundary does not claim that an approved reference exists for this starter.

For a future interaction, establish how its simulated versus persisted behavior will be communicated. Keep intended behavior, code-inspected behavior and demonstrated behavior distinct in the evidence. A success-shaped mock is not evidence that anything was saved. Missing evidence is not proof of fidelity, production readiness or permission to publish, use real data or mutate an external system.

Scenario meanings and fixture relationships belong to [SEED-DATA.md](./SEED-DATA.md). App structure and implementation constraints belong to [REPOSITORY.md](./REPOSITORY.md); they do not resolve product decisions.

## Safe validation scenarios

No service-specific test scenarios, observable acceptance outcomes or product limits on interaction and capture have been supplied. Establish those from the future task and its authority before using an interaction as acceptance evidence. Unknown destructive or externally visible actions are not authorized.

Use the current task's authority and approved test state for interactions. Guidance alone does not authorize real-data access, unknown side effects or publication. Tool/session selection, capture and artifact handling belong to [BROWSER-VALIDATION.md](./BROWSER-VALIDATION.md). A working preview alone is not product acceptance or evidence that an action is safe.

## Behavior decisions for a future task

The following is a decision checklist, **not an approved behavior specification**. Each row applies only if the future brief includes that feature or interaction. For each applicable row, obtain its normal, pending and failure outcomes, recovery behavior and observable acceptance evidence. Record unresolved decisions rather than implementing an assumed policy.

| Area | Decisions and evidence still needed |
| --- | --- |
| Navigation | Location cues, destinations, return paths, tab semantics and what happens when leaving unsaved edits. Do not infer saved state from a route change or infer discard confirmation from this checklist. |
| Forms and validation | Save boundary and model, validation timing, error placement, pending submission, duplicate submission handling, input treatment after failure and retry. Identify the actual persistence API separately if one is selected. No explicit-save, autosave or persistence model is selected here. |
| Loading, empty and degraded states | Which regions are data-backed; how first load, refresh, true empty data, no matches, partial data, unavailable data and request failure are distinguished; retry and safe state preservation. A failed request is not evidence of a successful empty collection. |
| Messaging | Message scope, visibility duration, dismissal, success timing and discoverable correction or recovery. No notification channel, timeout or retained-message behavior is established. |
| Progressive disclosure | What is optional versus essential, which consequences/errors/actions remain visible and meaningful control labels. No disclosure component or content hierarchy is selected. |
| Feature onboarding | Whether contextual help or onboarding is needed, dismissal behavior and any repeat-frequency, tracking or persistence policy. Missing sources do not prove that onboarding is unnecessary. |
| Data visualization | Whether there is a comparison task; units, time ranges, missing-data treatment and a readable data alternative. No chart, chart library or absence of charts is established. |
| Copy | Exact copy target, action placement, truthful success feedback, clipboard failure and selectable-text/manual-copy fallback. Clipboard permission is not presumed. |
| Delete | Target identity, affected scope, authority, confirmation, pending/failure recovery and focus after confirmed success. Permissions, retention, permanence, reversibility and undo remain unresolved. This row grants no deletion authority. |
| Filter | Scope, applied-state visibility, clearing/reset, composition, no matches and failed updates. Whether filters persist in the URL or elsewhere remains a product decision. |
| Search | Query scope, trigger/submission behavior, pending results, no matches, request failure, query treatment during retry and stale-response handling. Distinguish search from navigation and filtering; confirm request helpers before implementation. |

For a single form unit, the template cautions against mixing automatic and explicit saving. This is not a selection of either model or evidence that a save operation exists. Likewise, neither approval of this document nor a later UI mock can establish permissions, compliance, persistence, retention or reversibility.

## Ownership and next evidence

Keep product decisions with their supplied brief, human policy or approved research reference, including applicability and unresolved questions. A future task can supply the relevant evidence without reopening the explicitly skipped setup research or inventing a service in advance.

Use the linked owners for their own constraints; these links transfer ownership and do not certify that their checks have passed. This document remains a boundary/gaps record until actual product authority supports more specific guidance.

Authoring basis: the complete [product research template](../context-templates/PRODUCT-DESIGN.md), together with the supplied intake. The template is a research and authoring framework, not researched service policy.
