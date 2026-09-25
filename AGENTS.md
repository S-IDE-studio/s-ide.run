# AGENTS.md — s-ide.run project dispatcher

## Governance

- Top-level contract: [`constitution/CONSTITUTION.md`](constitution/CONSTITUTION.md)
- Current Operating Model: [`organization/profiles/release-driven-solo.md`](organization/profiles/release-driven-solo.md)
- Website facts: `README.md`, `package.json`, source, build/fetch scripts, deployment config, and accepted project docs.

## Working rules

- This repository is the public website, not the canonical S-IDE product/source authority.
- Treat fetched documentation as derived content. Keep its upstream identity/currentness explicit.
- Use repository-controlled Astro/check/build commands. Bun is only auxiliary Agent Skills tooling unless a separate application-toolchain decision changes that.
- Source checks, fetched-doc verification, built site, deployment, and public smoke are distinct evidence scopes.
- Durable implementation/dependency state belongs in GitHub Issues; review/integration evidence belongs in Pull Requests.
