# DESIGN.MD — Scrum Poker

> This file is maintained by the Design Specialist agent. It records the canonical, system-wide state of all UX design decisions. Each feature's design stage reads this file for consistency and updates it when new decisions are introduced. Subsequent features inherit decisions recorded here rather than redefining them.

---

## Design Philosophy

- **Simplicity first** — The UI should be immediately intuitive. A new participant should be able to join and vote within 30 seconds with zero instruction.
- **Real-time feedback** — Every state change (someone joined, voted, cards revealed) should feel instant without page refreshes.
- **Focus mode** — During an active voting round the current story and card deck dominate the viewport.
- **Clarity on reveal** — Vote distribution and consensus (or divergence) must be visually obvious at a glance.

---

## Color Palette

> Populated by the Design Specialist after the first UI-facing feature. Initial placeholder values flagged as assumptions — update with confirmed brand tokens when available.

| Role | Value | Notes |
|------|-------|-------|
| Background / Canvas | — | To be defined in F-001 design |
| Primary Surface | — | To be defined in F-001 design |
| Interactive Controls | — | To be defined in F-001 design |
| Accent | — | To be defined in F-001 design |
| Text Primary | — | To be defined in F-001 design |
| Text Secondary | — | To be defined in F-001 design |
| Text Disabled | — | To be defined in F-001 design |
| Border | — | To be defined in F-001 design |
| Error | — | To be defined in F-001 design |
| Success | — | To be defined in F-001 design |

---

## Typography

> Populated by the Design Specialist after the first UI-facing feature.

| Role | Font Family | Size | Weight | Line Height |
|------|------------|------|--------|------------|
| Title | — | — | — | — |
| Body | — | — | — | — |
| Assistive / Metadata | — | — | — | — |

---

## Spacing Rhythm

> Populated by the Design Specialist after the first UI-facing feature.

| Property | Value |
|----------|-------|
| Base unit | — |
| Shell padding | — |
| Section gap | — |
| Row height | — |
| Interactive hit target (min) | — |

---

## Elevation / Shadows

> Populated by the Design Specialist after the first UI-facing feature.

| Tier | CSS box-shadow value |
|------|---------------------|
| None | `none` |
| Low | — |
| Medium | — |

---

## Component States

> Populated by the Design Specialist after the first UI-facing feature.

| Control | Default | Hover | Focus | Active | Disabled | Error | Success |
|---------|---------|-------|-------|--------|---------|-------|---------|
| Button (primary) | — | — | — | — | — | — | — |
| Card (vote) | — | — | — | — | — | — | — |

---

## UX Patterns (Cross-Feature)

### Presence Indicators
All participants visible to each other at all times. A clear visual indicator shows whether each participant has voted (card face-down) or is still deciding (empty slot). Names shown below each card placeholder.

### Card Selection
Cards displayed as a horizontal row (or grid on mobile) at the bottom of the screen. Tapping/clicking a card selects it. A participant may change their selection any time before the reveal. Selected card is visually distinct.

### Reveal Mechanic
Only the facilitator sees a "Reveal Cards" button. On reveal: all cards flip simultaneously. Vote distribution shown. Consensus highlighted if all (or majority) voted the same value.

### Round Reset
After reveal, the facilitator can "Start New Round" (optionally naming the next story). All cards animate back to face-down and vote state clears.

### Responsive Layout
- **Desktop:** Participant cards arranged around a central table area.
- **Mobile:** Participant cards in a horizontal scroll row; voting deck below.

---

## Accessibility Conventions

- All interactive elements must have visible focus rings.
- Color is never the sole differentiator of state (always paired with icon or label).
- Card selection must be operable via keyboard (Tab + Enter/Space).
- ARIA live regions announce vote count changes to screen readers.
- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text (WCAG 2.1 AA).

---

## Design Decisions Log

| Decision | Rationale | Introduced In |
|----------|-----------|--------------|
| No login required | Reduces friction; anonymity is a feature | SYSTEM.MD |
| Facilitator-controlled reveal | Prevents anchoring bias | SYSTEM.MD |
| Ephemeral sessions | Simplifies architecture; no data-retention concerns | SYSTEM.MD |
| Fibonacci deck as default | Industry-standard for Scrum estimation | SYSTEM.MD |
