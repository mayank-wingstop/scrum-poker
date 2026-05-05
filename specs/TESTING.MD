# TESTING.MD — Scrum Poker

> This file is read by the Testing Specialist agent before any test execution. It defines canonical commands, coverage scope, quality thresholds, application startup, and screenshot conventions. Update this file when the stack, test tooling, or quality thresholds change.

---

## Canonical Test Commands

| Purpose | Command |
|---------|---------|
| Run all tests | `npm test` |
| Client tests only | `npm --workspace=src/client test` |
| Server tests only | `npm --workspace=src/server test` |
| Coverage report | `npm run test:coverage` |
| End-to-end tests | `npm run test:e2e` |
| Full CI sequence | `npm run lint && npm run typecheck && npm run build && npm run test:coverage` |

---

## Application Startup (for visual inspection and E2E)

```bash
# Development (client on :5173, server on :3001)
npm run dev

# Production preview (after build)
npm run build && npm start
```

- Client dev server: `http://localhost:5173`
- Server: `http://localhost:3001`
- Wait for the terminal to report both servers listening before capturing screenshots.

---

## Static Asset Path

After `npm run build`, the compiled client assets are at:
```
src/client/dist/
```

In dev mode, Vite serves assets from memory. To extract CSS token values during testing, fetch the stylesheet from the running dev server:
```
http://localhost:5173/src/index.css   (Tailwind base + utilities)
```
Or inspect the compiled output:
```
src/client/dist/assets/*.css
```

---

## Coverage Scope

| Workspace | Tool | Measured Paths |
|-----------|------|---------------|
| `src/client` | Vitest (v8) | `src/client/src/**/*.{ts,tsx}` |
| `src/server` | Jest (istanbul) | `src/server/src/**/*.ts` |

---

## Quality Gate Thresholds

| Metric | Minimum |
|--------|---------|
| Line coverage | 80% |
| Branch coverage | 75% |
| Function coverage | 80% |
| Statement coverage | 80% |

CI fails if any threshold is not met.

---

## Screenshot Storage Convention

Screenshots taken during testing must be committed files — not described as "available on request".

| Type | Path |
|------|------|
| E2E test failure screenshots | `tests/screenshots/{test-name}/{timestamp}.png` |
| QA evidence screenshots | `specs/7_test-results/images/F-XXX/{NN}-{description}.png` |

Filename format for QA evidence: zero-padded index + descriptive label.
Examples:
- `01-default-load.png`
- `02-room-joined.png`
- `03-vote-cast.png`
- `04-cards-revealed.png`
- `05-error-state.png`

Create the directory if it does not exist. Screenshots must be committed to the repository.

---

## Test Organization

```
tests/
  e2e/                    # Playwright end-to-end tests
    session.spec.ts
    voting.spec.ts
    reveal.spec.ts
  screenshots/            # E2E failure screenshots (auto-generated)

src/client/src/
  **/__tests__/           # Vitest component and hook tests

src/server/src/
  **/__tests__/           # Jest unit tests
```
