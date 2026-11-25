# Accessibility

Official GOV.UK component markup is a starting contract, not proof that a completed prototype is accessible. Follow [DESIGN-SYSTEM](DESIGN-SYSTEM.md) for component semantics and focus, the [audit skill](../skills/accessibility-audit/SKILL.md) for scoped assessment, and [BROWSER-VALIDATION](BROWSER-VALIDATION.md) for actual browser evidence.

## Acceptance inputs

No service-specific user tasks, support matrix, manual assistive-technology procedure, acceptance owner or approved exception is supplied. Resolve relevant inputs from the current brief; do not turn available tooling into a product support policy or repeatedly reopen the explicitly skipped product intake. Missing evidence is neither a pass nor an invented defect.

The root provides one main landmark, a skip link and route heading/title updates. Reusable error-summary callers own validation focus and error titles. Verify these connections when page composition or navigation changes. Provider limitations and React lifecycle/hash interactions remain explicit in the integration topic.

## Evidence

Record exact source/route/state, environment, criterion or agreed requirement, observation, user impact, reproduction and remaining gaps. Distinguish verified, failed, untested and not applicable assertions. Preserve relevant source/build identity when known.

Role queries, synthetic events and jsdom tests protect DOM and routing behaviour. Vite tests protect asset delivery and builds. Neither establishes real keyboard traversal, rendered contrast, announcements or screen-reader usability. A computed accessibility tree is not an actual assistive-technology observation. No full WCAG conformance follows from a successful check:starter.

Use applicable WCAG checks without inventing legal or service policy. Verify focus visibility, target sizes, reflow and contrast with appropriate rendered evidence; manual AT claims need named task/environment observations. Missing tooling leaves checks unverified. Do not install validators or browser engines without applicable authority.

## Safe testing

Use synthetic data, current task authority and the shared browser workflow. Keep product side effects, persistence and retention decisions in [PRODUCT-DESIGN](PRODUCT-DESIGN.md), scenario data in [SEED-DATA](SEED-DATA.md), and product viewport decisions in [RESPONSIVE-DESIGN](RESPONSIVE-DESIGN.md). These references do not authorize real-data access or external submissions.
