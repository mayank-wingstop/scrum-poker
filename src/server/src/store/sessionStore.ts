import { Session } from '@scrum-poker/shared';

// In-memory session store — ephemeral by design (see ARCHITECTURE.MD)
const sessionStore = new Map<string, Session>();

export default sessionStore;
