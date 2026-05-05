# Scrum Poker

A real-time, browser-based agile estimation tool built with **React + Node.js + WebSockets**.

---

## Framework

This project uses the **Trusted AI Delivery Framework (TADF)** — a spec-first, stage-gated workflow where every feature moves through 7 human-reviewed stages.

See [`specs/INDEX.MD`](specs/INDEX.MD) for the current status of all features.

---

## Repository Structure

```
specs/
  1_features/          # Feature definitions (human-authored)
  2_design/            # Design specs (design-specialist agent)
  3_architecture/      # Architecture specs (architecture-specialist agent)
  4_implementation-plan/ # Implementation plans (implementation-planner agent)
  5_test-plan/         # Test plans (testing-specialist agent)
  6_code-review/       # Code review docs (local-pr-review-specialist agent)
  7_test-results/      # Test results + screenshots (testing-specialist agent)
    images/            # QA evidence screenshots
  SYSTEM.MD            # System definition and constraints
  DESIGN.MD            # Cross-feature design decisions (color, type, spacing)
  ARCHITECTURE.MD      # System architecture and technology decisions
  TESTING.MD           # Canonical test commands, coverage thresholds, screenshot paths
  INDEX.MD             # Feature lifecycle tracker

src/
  client/              # React + Vite + TypeScript frontend
  server/              # Node.js + Express + ws backend
  shared/              # Shared TypeScript types

tests/
  e2e/                 # Playwright end-to-end tests

.github/
  agents/              # GitHub Copilot custom agent definitions (.agent.md)
  workflows/           # GitHub Actions stage orchestration
  CODEOWNERS           # Stage-based reviewer assignments
```

---

## Getting Started

> Scaffolding is created as part of **F-000 (Bootstrap)**. Once complete:

```bash
npm install       # Install all workspace dependencies
npm run dev       # Start client (:5173) + server (:3001)
npm test          # Run full test suite
npm run build     # Build for production
```

---

## TADF Workflow

```
Human writes specs/1_features/F-XXX.MD → merges to main
  ↓ GitHub Actions creates issue → @copilot (design-specialist)
Design agent writes specs/2_design/F-XXX.MD → human reviews → merges
  ↓ GitHub Actions creates issue → @copilot (architecture-specialist)
Architecture agent writes specs/3_architecture/F-XXX.MD → human reviews → merges
  ↓ GitHub Actions creates issue → @copilot (implementation-planner)
Planner writes specs/4_implementation-plan/F-XXX.MD → human reviews → merges
  ↓ GitHub Actions creates issue → @copilot (coding-specialist)
Coding agent writes src/** and tests/** → opens PR
  ↓ GitHub Actions creates issue → @copilot (testing-specialist)
Tester writes test plan, runs suite, captures screenshots → human QA approval → merge
```

---

## GitHub Setup

1. **Branch protection on `main`:** Require PRs, 1+ approvals, CI passing, no direct pushes.
2. **CODEOWNERS:** Edit `.github/CODEOWNERS` with real GitHub usernames.
3. **Copilot Business/Enterprise:** Required for `@copilot` issue assignment.
4. **Labels to create:** `tadf-stage-2`, `tadf-stage-3`, `tadf-stage-4`, `tadf-stage-5`, `tadf-stage-7`, `design`, `architecture`, `implementation-plan`, `coding`, `testing`.

---

## Next Steps

1. Push this repository to GitHub
2. Configure branch protection and CODEOWNERS
3. Run F-000 through all 7 stages
4. Begin writing `specs/1_features/F-001.MD` for the first product feature
