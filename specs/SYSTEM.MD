# SYSTEM.MD — Scrum Poker

## What This System Is

Scrum Poker (also known as Planning Poker) is a **real-time, browser-based agile estimation tool** used by software development teams during sprint planning sessions. Team members vote anonymously on the effort required for user stories or backlog items using a deck of cards with values based on the Fibonacci sequence (or similar scales).

The application enables distributed and co-located teams to collaboratively estimate work without anchoring bias, revealing all votes simultaneously once everyone has voted.

---

## Business Domain & Terminology

| Term | Definition |
|------|-----------|
| **Session** | A single planning poker meeting with a unique shareable link |
| **Room** | Synonym for Session; the virtual space participants join |
| **Facilitator** | The session creator who controls the game flow (reveal, reset, next story) |
| **Participant** | Any user who joins a session to cast votes |
| **Story / Ticket** | The work item being estimated in a given round |
| **Vote** | A numeric or special card value selected by a participant |
| **Reveal** | The moment all votes are shown simultaneously to all participants |
| **Round** | One full cycle of voting for a single story (cast → reveal → reset) |
| **Deck** | The set of card values available for voting (e.g., Fibonacci, T-shirt sizes) |
| **Consensus** | Agreement on an estimate, indicated when most votes converge on a single value |

---

## Non-Negotiable Constraints

1. **Real-time synchronization** — All participants in a session must see vote status updates instantly via WebSocket connections.
2. **Anonymous voting before reveal** — Participant vote selections must not be visible to others until the facilitator triggers a reveal.
3. **No persistent user accounts required** — Participants join by entering a display name; no sign-up or login is required.
4. **Session isolation** — One session's data must never be visible to or affect another session.
5. **No votes stored permanently** — Vote data is ephemeral and lives only for the duration of the session in memory; no database persistence of votes.
6. **Facilitator-only controls** — Only the session creator may reveal cards, reset the round, or end the session.
7. **Mobile-responsive** — The UI must be fully usable on mobile devices (phone and tablet screen sizes).
8. **Accessibility** — The UI must meet WCAG 2.1 AA standards (keyboard navigable, screen-reader compatible, sufficient color contrast).

---

## Regulatory, Security & Compliance Boundaries

- No personally identifiable information (PII) is collected or stored beyond a display name chosen by the user for the session duration.
- No authentication tokens, passwords, or credentials are stored.
- Session data is held in server memory only and discarded when the session ends or the server restarts.
- WebSocket connections must be secured (WSS) in production.
- HTTPS required in production.
- No third-party analytics or tracking scripts without explicit user consent.

---

## Target Users

- **Agile development teams** (Scrum, Kanban, SAFe) of 2–20 members
- **Distributed / remote-first teams** who need a shared real-time estimation tool
- **Scrum Masters and Product Owners** facilitating sprint planning

---

## Out of Scope (for now)

- User account management or persistent history
- Integration with Jira, Azure DevOps, or other project management tools
- Video/audio conferencing within the app
- Multi-room management dashboards
- AI-powered estimation suggestions
