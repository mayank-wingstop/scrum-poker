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
| F-001 | Session Creation | 🔍 | ✅ | ✅ | ✅ | 🔍 | ⬜ | ⬜ |
| F-002 | Participant Join Flow | 🔍 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| F-003 | Voting Room Layout | 🔍 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| F-004 | Voting: Cast, Change & Reveal | 🔍 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| F-005 | Results Display | 🔍 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| F-006 | Issue Queue (Story Sidebar) | 🔍 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| F-007 | Invite Players Panel | 🔍 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| F-008 | Game Settings & Configuration | 🔍 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

---

## Feature Descriptions

| Feature ID | Title | Description |
|-----------|-------|-------------|
| F-000 | Project Bootstrap | Initialize repository structure, scaffolding, tooling, CI, and baseline test suite. No product features delivered. |
| F-001 | Session Creation | Landing page and POST /sessions endpoint. Facilitator enters a display name and optional first story; a UUID session is created; facilitator is redirected to the room. |
| F-002 | Participant Join Flow | Name-entry screen for participants navigating to a session URL. WebSocket JOIN handshake, SESSION_STATE response, identity stored in sessionStorage, reconnect on refresh. |
| F-003 | Voting Room Layout | Persistent room shell: header, participant sidebar with vote-status indicators, story prompt area, card deck placeholder, reconnection banner. Real-time presence updates. |
| F-004 | Voting: Cast, Change & Reveal | Card deck interaction — cast vote, change vote before reveal. Facilitator Reveal and New Round controls. VOTE / REVEAL / RESET WebSocket round-trip. Vote values hidden until reveal. |
| F-005 | Results Display | Post-reveal results panel: flipped vote cards, numeric average, vote distribution bar, consensus indicator (≥ 75% agreement). Disappears on ROUND_RESET. |
| F-006 | Issue Queue (Story Sidebar) | Facilitator-managed story queue. ADD_STORY / SET_STORY / ESTIMATE_STORY / DELETE_STORY WS events. Active story broadcast to all participants. Done list with agreed estimates. |
| F-007 | Invite Players Panel | Session URL display with one-click copy, client-side QR code, live participant count and name list. Accessible modal/drawer, available to all participants. |
| F-008 | Game Settings & Configuration | Facilitator settings panel: deck type (Fibonacci / Modified Fibonacci / T-shirt / Powers of 2), auto-reveal toggle, show-average toggle, voting timer (0–120 s), session name. |

---

## Stage Audit Trail

| Feature | Stage | Status | Set By | Notes |
|---------|-------|--------|--------|-------|
| F-000 | Stage 1: Feature | ✅ | Human | Bootstrap feature definition committed |
| F-000 | Stage 4: Implementation Plan | ✅ | Human | Approved |
| F-000 | Stage 5: Coding | ✅ | Human | Approved |
| F-000 | Stage 6: Code Review | ✅ | Human | Approved |
| F-000 | Stage 7: Testing | ✅ | Human | Approved — F-000 complete |
| F-001 | Stage 1: Feature | 🔍 | Agent | Feature definition written — awaiting human approval |
| F-001 | Stage 2: Design | 🔍 | tadf-design | specs/2_design/F-001.MD complete — awaiting human review |
| F-001 | Stage 3: Architecture | ✅ | Human | Approved |
| F-001 | Stage 4: Implementation Plan | ✅ | Human | Approved |
| F-001 | Stage 5: Coding | 🔍 | tadf-coding | src/** and tests/** updated — awaiting human review |
| F-002 | Stage 1: Feature | 🔍 | Agent | Feature definition written — awaiting human approval |
| F-003 | Stage 1: Feature | 🔍 | Agent | Feature definition written — awaiting human approval |
| F-004 | Stage 1: Feature | 🔍 | Agent | Feature definition written — awaiting human approval |
| F-005 | Stage 1: Feature | 🔍 | Agent | Feature definition written — awaiting human approval |
| F-006 | Stage 1: Feature | 🔍 | Agent | Feature definition written — awaiting human approval |
| F-007 | Stage 1: Feature | 🔍 | Agent | Feature definition written — awaiting human approval |
| F-008 | Stage 1: Feature | 🔍 | Agent | Feature definition written — awaiting human approval |

---

## Notes

- F-000 skips Stages 2 (Design) and 3 (Architecture) — bootstrap has no UI and all architectural decisions are already in `specs/ARCHITECTURE.MD`.
- F-001 through F-008 are all at Stage 1 (🔍) — awaiting human review and approval before any Stage 2 (Design) work begins.
- Features should be approved and worked sequentially: F-001 → F-002 → F-003 → F-004 → F-005. F-006, F-007, F-008 can be parallelised after the core voting loop (F-001–F-005) is complete.
- Each coding stage (Stage 5) creates a `feature/F-XXX` branch and opens a PR. Merge to `main` is gated on CI passing and 1 CODEOWNER approval.
