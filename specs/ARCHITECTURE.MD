# ARCHITECTURE.MD — Scrum Poker

> This file is maintained by the Architecture Specialist agent. It records the current authoritative system architecture. Each feature's architecture stage reads this file for consistency and updates it when new architectural decisions are required. Entries are append-only — never remove existing decisions.

---

## System Overview

Scrum Poker is a **real-time single-page web application** built on a client-server architecture using WebSockets for bidirectional, low-latency communication between participants in a shared session.

```
┌─────────────────────────────────────────────────────────┐
│                        Client                           │
│              React SPA (Vite + TypeScript)              │
└───────────────────────────┬─────────────────────────────┘
                            │  WSS / HTTPS
┌───────────────────────────▼─────────────────────────────┐
│                     Server                              │
│              Node.js + Express + ws                     │
│              In-Memory Session Store (Map)               │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Choices

### Frontend
| Technology | Choice | Rationale |
|-----------|--------|-----------|
| Framework | React 18 + TypeScript | Industry standard; component model fits card/room UI |
| Build Tool | Vite | Fast HMR; optimized production builds |
| State Management | Zustand | Lightweight; avoids Redux boilerplate |
| Styling | Tailwind CSS | Utility-first; rapid responsive UI |
| WebSocket Client | Native browser WebSocket API | No additional library needed |
| Testing | Vitest + React Testing Library | Vite-native; fast unit/component testing |

### Backend
| Technology | Choice | Rationale |
|-----------|--------|-----------|
| Runtime | Node.js 20 LTS | Non-blocking I/O ideal for WebSocket workloads |
| Framework | Express 4 | Minimal; handles REST session creation |
| WebSocket | ws (npm) | De facto standard; lightweight |
| Session Storage | In-memory (JavaScript Map) | Sessions are ephemeral by design |
| Language | TypeScript | Type safety across the stack |
| Testing | Jest + Supertest | Reliable Node.js testing |

### Shared
| Technology | Choice | Rationale |
|-----------|--------|-----------|
| Monorepo | npm Workspaces | Simple; native to npm |
| Linting | ESLint + Prettier | Code quality and formatting |
| CI | GitHub Actions | Native to repository |

---

## Repository Source Structure

```
src/
  client/               # React frontend (Vite app)
    src/
      components/       # UI components
      hooks/            # Custom React hooks
      store/            # Zustand state stores
      pages/            # Route-level components
      types/            # Shared TypeScript types
    index.html
    vite.config.ts

  server/               # Node.js backend
    src/
      routes/           # Express REST routes
      ws/               # WebSocket message handlers
      store/            # In-memory session store
      types/            # Shared TypeScript types
    index.ts

  shared/               # Types shared between client and server
    types.ts
```

---

## Data Model (In-Memory)

```typescript
type CardValue = number | '?' | '☕';

interface Participant {
  id: string;
  name: string;
  vote: CardValue | null;
  connected: boolean;
}

interface Session {
  id: string;
  facilitatorId: string;
  currentStory: string;
  deck: CardValue[];
  participants: Map<string, Participant>;
  revealed: boolean;
  createdAt: Date;
}
```

---

## WebSocket Event Protocol

All messages are JSON-encoded: `{ type: string, payload: object }`

### Client → Server
| Event | Payload | Description |
|-------|---------|-------------|
| `JOIN` | `{ sessionId, name }` | Join a session |
| `VOTE` | `{ value }` | Cast a vote |
| `REVEAL` | `{}` | Reveal all cards (facilitator only) |
| `RESET` | `{ story? }` | Reset for next round (facilitator only) |
| `KICK` | `{ participantId }` | Remove a participant (facilitator only) |

### Server → Client
| Event | Payload | Description |
|-------|---------|-------------|
| `SESSION_STATE` | Full session snapshot | Sent on join and after any state change |
| `PARTICIPANT_JOINED` | `{ participant }` | Broadcast on join |
| `PARTICIPANT_LEFT` | `{ participantId }` | Broadcast on disconnect |
| `VOTE_CAST` | `{ participantId }` | Vote registered (value hidden) |
| `CARDS_REVEALED` | `{ votes: Record<string, CardValue> }` | All votes revealed |
| `ROUND_RESET` | `{ story }` | Round reset broadcast |
| `ERROR` | `{ message }` | Server-side error |

---

## Scaling & Reliability

- **Single-server model** for MVP; horizontal scaling requires Redis pub/sub (future feature).
- **Session TTL**: Sessions evicted after 2 hours of inactivity.
- **Reconnection**: Clients reconnect with exponential backoff on disconnect.

---

## Security Decisions

- Session IDs are UUID v4 — not guessable.
- Facilitator identity verified server-side on privileged actions.
- Input sanitization on all incoming WebSocket message fields.
- Rate limiting on REST endpoints (express-rate-limit).

---

## Architecture Decision Log

| Decision | Rationale | Introduced In |
|----------|-----------|--------------|
| WebSockets over polling | Real-time requirement; polling introduces unacceptable latency | SYSTEM.MD |
| In-memory session store | Sessions are ephemeral; no operational complexity | SYSTEM.MD |
| Monorepo with npm workspaces | Shared types between client/server | F-000 |
| Vite over CRA | Faster DX; CRA no longer maintained | F-000 |
| Zustand over Redux | State is simple; Redux overhead not justified | F-000 |
| ws over Socket.io | Lighter weight; Socket.io namespacing not needed | F-000 |
