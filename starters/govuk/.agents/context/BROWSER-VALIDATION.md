# Browser validation

Use [Replica preflight](../../REPLICA.md#canvas-preflight) and the [shared browser workflow](../skills/browser-canvas-validation/WORKFLOW.md). Keep the visible Replica preview open; browser inspection is a separate surface.

## Intended target

Verify the intended project/worktree and actual printed server URL. npm run dev starts Vite; npm run preview builds before serving dist. Read [.prototype](../../.prototype) or the requested route, preserving the full path, query and hash. The welcome page is initially at /#/ with heading GOV.UK prototype starter. Inspect current source if content has changed; do not permanently use that heading to identify later service pages.

The root supplies one GOV.UK shell/main. Unknown routes show a missing-page fallback. Confirm actual content after lazy loading; an HTTP response, title or readyState alone is not a rendered pass. Reuse a correct responsive server and never restart it merely because inspection timed out.

## Runtime and actions

Discover current browser/canvas capabilities and schemas. Reuse the same provider and owned panel handle until its contract is invalidated; acquire other identifiers only when required and runtime-returned. Read fresh structure before element-reference actions and after navigation or relevant state changes.

Use the browser canvas first. Only when a required capability is unavailable, or bounded recovery fails, disclose the exact blocker and use the configured isolated Playwright MCP for affected checks. Follow [.github/README.md](../../.github/README.md) for trust and fresh-session setup. Configuration is not tool availability; do not invent a pass or install engines to hide a blocker. Application failures and authentication walls are not reasons to switch drivers.

## Assertions and safe state

For affected changes, check skip-link focus and fragment preservation, route title/focus, Back/Forward, reload, missing-route recovery and generated pages. Asset changes require development and built-preview checks, including deployment subpaths. Inspect stylesheet/font/image requests and actual rendering rather than treating installation as integration.

Use synthetic test state and only interactions authorized by the current task. The starter itself has no storage or external submissions. Never inherit authentication, copy browser profiles/cookies, attach to existing tabs or inspect unrelated pages. Stop dependent checks at an authentication wall. Keep evidence minimal, private and free of credentials.

Keyboard, contrast, zoom, forced colours and screen-reader claims require their actual applicable observations. Report tested environment, route/state and evidence separately from build success and tool discovery. Product viewport/support requirements remain in [RESPONSIVE-DESIGN](RESPONSIVE-DESIGN.md); accessibility acceptance belongs to [ACCESSIBILITY](ACCESSIBILITY.md).

## Recovery and cleanup

Inspect the resulting state before retrying a timed-out interaction. Follow the shared workflow's single bounded same-panel recovery; do not create duplicate panels or reset a healthy server. Start a permitted fallback with a fresh read. Close only run-owned temporary browser/server resources when finished, preserving the user's preview and unrelated state. Report unavailable checks explicitly.
