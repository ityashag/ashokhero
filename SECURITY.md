# Security

Report a suspected vulnerability privately through the repository's Security tab
or email yash.cse21@gmail.com. Do not post customer details or credentials in issues.

## Repository and deployment

- Keep production on `main`. Use a branch and a pull request for changes.
- `Build and security checks` and `Dependency review` must pass before merging.
- Dependency review blocks newly introduced high/critical advisories; it does not
  certify existing dependencies as vulnerability-free.
- Actions are pinned to commit SHAs. Builds use read-only tokens; only the Pages
  deployment job receives Pages/OIDC permissions. No job needs repository write access.
- Production is published through the `github-pages` environment, limited to `main`.
- Dependency alerts remain enabled, but automatic security-fix PRs are disabled and
  no Dependabot version-update schedule is configured. Review alerts and apply
  needed updates manually through a tested PR.
- A single maintainer can merge a passing PR. Add one required independent approval
  when a second trusted maintainer is available. Account owners should use a passkey
  or two-factor authentication and keep recovery codes offline.

## Workflow abuse and spending controls

- All external fork contributors require maintainer approval to run workflows.
- PR validation runs only on PRs targeting `main`, with superseded runs cancelled.
- Production publishes only on `main` updates or an explicit manual run on `main`.
- Jobs use standard `ubuntu-latest` runners and have 10–15 minute timeouts.
- No paid/larger/self-hosted runners, AI-agent actions, scheduled dependency PRs or
  automatic merging are configured. No npm Actions cache is stored; the deployment
  artifact expires after one day.
- Public-repository standard runner minutes are free under GitHub's current billing
  rules. Storage, other repositories, larger runners and separate AI products have
  their own billing. These repository controls do not set an account-wide spending cap.
- Review automation before approving fork workflows: a timeout is per job, not an
  account budget. Workflow rules cannot stop all public PR submissions.

Billing reference: https://docs.github.com/en/billing/concepts/product-billing/github-actions

## Customer data and credentials

This is a public repository and a public static website. Source, images and compiled
JavaScript are downloadable. Never commit lead exports, private sheets, API tokens,
private keys or customer conversations. Use a private CRM/backend for customer data.

`REACT_APP_*` values are compiled into public JavaScript, even when supplied through
GitHub Actions secrets. The lead webhook URL is a public endpoint, not a credential.
Protect it server-side with validation, abuse limits and a verified challenge before
paid campaigns. The included Apps Script is a starter integration, not a hardened API:
it still needs server-side consent/field validation, formula-injection prevention,
rate limits and reliable delivery acknowledgement before production use.

The existing `no-cors` submission cannot verify that a lead was stored. Do not count
it, or a WhatsApp button click, as a confirmed customer message or sale.

If a credential is exposed, revoke/rotate it first; deleting it in a later commit
does not remove it from history or invalidate copies. GitHub push protection is an
additional safeguard, not a substitute for credential hygiene.

## Hosting limitations

GitHub Pages provides HTTPS but does not execute a private lead backend or support
arbitrary response-header configuration through a repository `_headers` file.
Keep administrative screens and authenticated lead storage off this public site.
