# Attribution

This starter derives from Replica Minimal and the locally developed GOV.UK integration. GOV.UK Frontend and its supplied assets retain their applicable licences. The bundled [GOV.UK Frontend licence](vendor/govuk-frontend/LICENSE.txt) contains the complete, unchanged upstream file for the pinned dependency:

- Version: `6.6.0`.
- Commit: `24bde7283766754254275ff27d09e78ff2bfa85d`.
- Source: [upstream LICENSE.txt](https://raw.githubusercontent.com/alphagov/govuk-frontend/24bde7283766754254275ff27d09e78ff2bfa85d/LICENSE.txt).
- SHA-256: `c652f35b1f2e5b88eb49f1e8a935eec79b4761a81666ace576e1af723f4a9238`.

The asset integration reads this bundled file locally, serves its unchanged bytes at the base-relative govuk/LICENSE.txt URL in development and emits dist/govuk/LICENSE.txt in production. Startup and builds fail if the bundled file cannot be read. Builds do not fetch a licence or require LICENSE.txt in the installed npm package. See [README](README.md#guidance-and-attribution).
