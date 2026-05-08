import { Session, Participant, CardValue } from '@scrum-poker/shared';

// In-memory session store — ephemeral by design (see ARCHITECTURE.MD)
const sessionStore = new Map<string, Session>();

const DEFAULT_DECK: CardValue[] = [1, 2, 3, 5, 8, 13, 21, '?', '☕'];

interface CreateSessionParams {
  sessionId: string;
  facilitatorId: string;
  facilitatorName: string;
  story: string;
}

export function createSession(params: CreateSessionParams): Session {
  const { sessionId, facilitatorId, facilitatorName, story } = params;

  const facilitator: Participant = {
    id: facilitatorId,
    name: facilitatorName,
    vote: null,
    connected: false,
  };

  const session: Session = {
    id: sessionId,
    facilitatorId,
    currentStory: story,
    deck: [...DEFAULT_DECK],
    participants: new Map([[facilitatorId, facilitator]]),
    revealed: false,
    createdAt: new Date(),
  };

  sessionStore.set(sessionId, session);
  return session;
}

export default sessionStore;
