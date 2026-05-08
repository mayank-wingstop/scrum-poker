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

> Introduced in F-001. Values marked **[ASSUMPTION]** are best-fit placeholders — update with confirmed brand tokens when available.

| Role | CSS Token | Value | Notes |
|------|----------|-------|-------|
| Background / Canvas | `--color-canvas` | `#F1F5F9` | Slate-100 **[ASSUMPTION]** |
| Primary Surface | `--color-surface` | `#FFFFFF` | White; cards, panels |
| Interactive Controls | `--color-primary` | `#4F46E5` | Indigo-600 **[ASSUMPTION]** |
| Primary Hover | `--color-primary-hover` | `#4338CA` | Indigo-700 |
| Primary Active | `--color-primary-active` | `#3730A3` | Indigo-800 |
| Accent | `--color-accent` | `#7C3AED` | Violet-600 **[ASSUMPTION]** |
| Text Primary | `--color-text-primary` | `#0F172A` | Slate-900 |
| Text Secondary | `--color-text-secondary` | `#64748B` | Slate-500 |
| Text Disabled | `--color-text-disabled` | `#94A3B8` | Slate-400 |
| Text on Primary | `--color-text-on-primary` | `#FFFFFF` | White on primary bg |
| Border | `--color-border` | `#E2E8F0` | Slate-200 |
| Border Focus | `--color-border-focus` | `#4F46E5` | Indigo-600 |
| Error | `--color-error` | `#EF4444` | Red-500 |
| Error Background | `--color-error-bg` | `#FEF2F2` | Red-50 |
| Success | `--color-success` | `#10B981` | Emerald-500 |
| Success Background | `--color-success-bg` | `#ECFDF5` | Emerald-50 |

---

## Typography

> Introduced in F-001. Font: Inter (via `@fontsource/inter` or Google Fonts); fallback: `system-ui, -apple-system, sans-serif`.

| Role | Size | Weight | Line Height | Usage |
|------|------|--------|------------|-------|
| Display / Hero | `2rem` (32px) | `700` | `1.2` | App name, page titles |
| Title | `1.5rem` (24px) | `600` | `1.3` | Section headings |
| Body Strong | `1rem` (16px) | `600` | `1.5` | Field labels, emphasized copy |
| Body | `1rem` (16px) | `400` | `1.5` | General text, button labels |
| Assistive / Metadata | `0.875rem` (14px) | `400` | `1.4` | Helper text, error messages |
| Micro | `0.75rem` (12px) | `400` | `1.3` | Badges, timestamps |

Font declaration on `:root` or `body`:
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

## Spacing Rhythm

> Introduced in F-001. Base unit: 4px (`0.25rem`). All spacing values are multiples of 4px.

| Property | Value | px |
|----------|-------|----|
| Base unit | `0.25rem` | 4px |
| Shell padding (desktop) | `1.5rem` | 24px |
| Shell padding (mobile) | `1rem` | 16px |
| Section gap | `1.5rem` | 24px |
| Form field stack gap | `1rem` | 16px |
| Label → input gap | `0.5rem` | 8px |
| Interactive hit target (min) | `2.75rem` | 44px |
| Card internal padding (desktop) | `2rem` | 32px |
| Card internal padding (mobile) | `1.25rem` | 20px |
| Border radius (inputs, cards) | `0.5rem` | 8px |
| Border radius (buttons) | `0.5rem` | 8px |

---

## Elevation / Shadows

> Introduced in F-001.

| Tier | CSS Token | `box-shadow` value |
|------|----------|--------------------|
| None | `--shadow-none` | `none` |
| Low | `--shadow-low` | `0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)` |
| Medium | `--shadow-md` | `0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05)` |
| High | `--shadow-high` | `0 10px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)` |

---

## Component States

> Introduced in F-001.

### Primary Button

| State | Background | Text | Border | Notes |
|-------|-----------|------|--------|-------|
| Default | `#4F46E5` | `#FFFFFF` | none | — |
| Hover | `#4338CA` | `#FFFFFF` | none | `translateY(-1px)` |
| Focus | `#4F46E5` | `#FFFFFF` | `3px solid rgba(79,70,229,0.4)` offset 2px | outline |
| Active | `#3730A3` | `#FFFFFF` | none | `translateY(0)` |
| Disabled/Loading | `#A5B4FC` | `#FFFFFF` | none | `opacity: 0.7`, `cursor: not-allowed` |

### Text Input

| State | Border | Background | Notes |
|-------|--------|-----------|-------|
| Default | `1px solid #E2E8F0` | `#FFFFFF` | — |
| Hover | `1px solid #94A3B8` | `#FFFFFF` | — |
| Focus | `2px solid #4F46E5` | `#FFFFFF` | `--shadow-low` applied |
| Disabled | `1px solid #E2E8F0` | `#F8FAFC` | — |
| Error | `2px solid #EF4444` | `#FFFFFF` | Always pair with inline error text + icon |
| Error + Focus | `2px solid #EF4444` | `#FFFFFF` | `0 0 0 3px rgba(239,68,68,0.15)` shadow |

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

### Validation Pattern
- Validate on submit only (never on blur during initial entry).
- After first submission attempt, clear errors reactively as the user corrects input.
- Error messages always paired with an icon — never color alone.

### Error Communication
- **Inline errors:** Below the specific field, `role="alert"`, `aria-live="polite"`.
- **Global errors (API failures):** Banner above the form, dismissible, auto-dismiss after 8s.

---

## Accessibility Conventions

- All interactive elements must have visible focus rings (`outline: 3px solid rgba(79,70,229,0.5); outline-offset: 2px`).
- Color is never the sole differentiator of state (always paired with icon or label).
- Card selection must be operable via keyboard (Tab + Enter/Space).
- ARIA live regions announce vote count changes to screen readers.
- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text (WCAG 2.1 AA).
- Error states always include an icon (⚠️) alongside the red color.
- `aria-required="true"` on required inputs; `aria-describedby` links input to its error element.
- `aria-busy="true"` on submit button during loading state.

---

## Design Decisions Log

| Decision | Rationale | Introduced In |
|----------|-----------|--------------|
| No login required | Reduces friction; anonymity is a feature | SYSTEM.MD |
| Facilitator-controlled reveal | Prevents anchoring bias | SYSTEM.MD |
| Ephemeral sessions | Simplifies architecture; no data-retention concerns | SYSTEM.MD |
| Fibonacci deck as default | Industry-standard for Scrum estimation | SYSTEM.MD |
| Indigo/Slate color theme | Professional, accessible, widely used in productivity tools | F-001 (D-101) **[ASSUMPTION]** |
| Inter typeface | Modern, highly legible, free, excellent at small sizes | F-001 (D-102) **[ASSUMPTION]** |
| 4px spacing base unit | Aligns with Tailwind defaults; consistent rhythm across components | F-001 (D-103) |
| Validate on submit only | Avoids premature errors while user is still typing | F-001 (IB-002) |
| Error icon mandatory | Ensures errors are not communicated by color alone (WCAG 1.4.1) | F-001 (AC-001) |
