# Responsive design

This document owns product viewport and responsive task requirements shared by creation and review. Setup supplied no product matrix. Use the current authorized task's decisions where provided; do not treat an initial gap as a permanent restriction.

## Authority and scope

The saved source registry, version 2, `intake.product`, explicitly says:

> Skip product sources for now.

It further states:

> No specific service, user journey, business rules or research findings have been selected yet.

These are intake decisions, not findings about a service. No product sources or product viewport/support matrix were selected during setup. Provider documentation and local implementation are not substitutes. This is not evidence that responsive requirements do not exist.

No numeric viewport defaults, device assumptions, breakpoint targets or mobile behaviours are established here. GOV.UK Frontend implementation guidance cannot establish service-specific requirements or prove their satisfaction.

## Viewport matrix: unresolved

The following product decisions remain open together:

- Supported viewport dimensions, device classes and orientations.
- Required browsers and any support qualifications.
- Relevant page, scenario and interaction states at each target.
- Zoom and reflow acceptance conditions.
- Documented exclusions, including their rationale and precise scope.

There are no approved entries in the product viewport matrix and no documented product exclusions. An unspecified target is not an exclusion.

Implementation breakpoints are distinct from test targets. Do not turn provider breakpoints, CSS media queries, current browser dimensions or a component's name into the product matrix. Provider responsive sizing, wrapping and token/API constraints belong to [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md). Applicable accessibility requirements belong to [ACCESSIBILITY.md](./ACCESSIBILITY.md); a later desktop-only product scope would not by itself remove them.

## Required tasks and narrow navigation: unresolved

There is no selected journey from which to determine which content and actions must remain visible, operable or reachable at each layout. In particular, there is no approved policy for narrow-layout destinations versus panels, disclosure, or current-location cues.

Do not assume navigation collapses, moves into a menu, becomes a separate destination or disappears. A layout change must not be presented as approved product behaviour merely because the provider supports it.

Use [PRODUCT-DESIGN.md](./PRODUCT-DESIGN.md) for the shared navigation, scenario and state policy. A later responsive task needs explicit task-specific decisions about required access and transitions, rather than inferred behaviour from this starting point.

## Overflow and content: unresolved

No intentional scrolling regions, acceptable truncation rules, essential-content access mechanisms or body-scroll exceptions have been selected. Density preferences and task completion requirements are also not established.

Do not interpret this absence as approval for clipping, hiding essential content, horizontal page scrolling, or forbidding all component-level scrolling. Those decisions require product context and applicable accessibility constraints. Provider wrapping or sizing options describe implementation capability, not acceptance.

## Prerequisite for later responsive acceptance

Before claiming a responsive task passes, obtain an explicit task brief or approved product evidence establishing:

- The relevant viewport/browser/orientation matrix, required states, zoom/reflow conditions, and any scoped exclusions.
- Tasks and essential content/actions that must remain available, including narrow-navigation and disclosure expectations.
- Permitted scrolling, truncation and access to full essential content, with any justified body-scroll exceptions.
- State-by-viewport acceptance expectations and the evidence needed to evaluate them.

Record the source, decision owner and whether these decisions apply only to the current task or are approved reusable policy. Task-specific agreement does not silently become a universal product matrix. Unresolved acceptance decisions must remain visible; a partial check must name its actual scope rather than report an unqualified pass.

Use [REPOSITORY.md](./REPOSITORY.md) to locate the actual layout/style implementation. Use [BROWSER-VALIDATION.md](./BROWSER-VALIDATION.md) for repository-specific preview and evidence constraints, including resize, capture, overflow measurements, tooling suppression/restoration and evidence limitations. Generic audit procedures and browser-driver commands remain in the relevant skills, not in this product policy.

Static CSS, provider examples and starter-readiness observations cannot prove a rendered responsive pass. Report the actual task scope and evidence, not an unqualified mobile-support or compliance claim.

## Document boundary

Keep this owner whole: its missing matrix, task access, overflow decisions and acceptance prerequisite form one short, interdependent boundary. There are no evidenced task-specific details that readers could meaningfully skip through separate topics. Shared-owner links above transfer responsibility without duplicating other owners' policy.
