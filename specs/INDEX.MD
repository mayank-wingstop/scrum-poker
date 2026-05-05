# INDEX.MD — Feature Lifecycle Tracker

> Single source of truth for every feature's progress through the TADF pipeline. Each agent updates this file when it completes its stage output.

---

## Status Key

| Symbol | Meaning | Set By |
|--------|---------|--------|
| ⬜ | Not started | — |
| ⏳ | Agent actively working | Agent (on start) |
| 🔍 | Output complete — awaiting human review & approval | Agent (on completion) |
| ✅ | Human approved and merged to main | Human |
| 🚫 | Blocked — see Notes | Human or Agent |

> **Rule:** A stage moves to ✅ only when a human reviews the output and approves. Agents set 🔍 when done — that is the signal for human review.

---

## Feature Pipeline

| Feature ID | Title | Stage 1: Feature | Stage 2: Design | Stage 3: Architecture | Stage 4: Impl. Plan | Stage 5: Coding | Stage 6: Review | Stage 7: Testing |
|-----------|-------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| F-000 | Project Bootstrap | ✅ | ⬜ | ⬜ | ✅ | ✅ | ✅ | ✅ |

---

## Feature Descriptions

| Feature ID | Title | Description |
|-----------|-------|-------------|
| F-000 | Project Bootstrap | Initialize repository structure, scaffolding, tooling, CI, and baseline test suite. No product features delivered. |

---

## Stage Audit Trail

| Feature | Stage | Status | Set By | Notes |
|---------|-------|--------|--------|-------|
| F-000 | Stage 1: Feature | ✅ | Human | Bootstrap feature definition committed |
| F-000 | Stage 4: Implementation Plan | ✅ | Human | Approved |
| F-000 | Stage 5: Coding | ✅ | Human | Approved |
| F-000 | Stage 6: Code Review | ✅ | Human | Approved |
| F-000 | Stage 7: Testing | ✅ | Human | Approved — F-000 complete |

---

## Notes

- No product feature (F-001+) should enter the pipeline until F-000 reaches ✅ in Stage 7 (Testing).
- F-000 skips Stages 2 (Design) and 3 (Architecture) — bootstrap has no UI and all architectural decisions are already in `specs/ARCHITECTURE.MD`.
- **Current action required:** Write `specs/1_features/F-001.MD` for the first product feature.
