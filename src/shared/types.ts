// Shared types between client and server — Scrum Poker

export type CardValue = number | '?' | '☕';

export interface Participant {
  id: string;
  name: string;
  vote: CardValue | null;
  connected: boolean;
}

export interface Session {
  id: string;
  facilitatorId: string;
  currentStory: string;
  deck: CardValue[];
  participants: Map<string, Participant>;
  revealed: boolean;
  createdAt: Date;
}

// Serializable session snapshot (Map converted to array for transport)
export interface SessionSnapshot {
  id: string;
  facilitatorId: string;
  currentStory: string;
  deck: CardValue[];
  participants: Participant[];
  revealed: boolean;
  createdAt: string;
}

// ─── Client → Server messages ────────────────────────────────────────────────

export type ClientMessage =
  | { type: 'JOIN'; payload: { sessionId: string; name: string } }
  | { type: 'VOTE'; payload: { value: CardValue } }
  | { type: 'REVEAL'; payload: Record<string, never> }
  | { type: 'RESET'; payload: { story?: string } }
  | { type: 'KICK'; payload: { participantId: string } };

// ─── Server → Client messages ────────────────────────────────────────────────

export type ServerMessage =
  | { type: 'SESSION_STATE'; payload: SessionSnapshot }
  | { type: 'PARTICIPANT_JOINED'; payload: { participant: Participant } }
  | { type: 'PARTICIPANT_LEFT'; payload: { participantId: string } }
  | { type: 'VOTE_CAST'; payload: { participantId: string } }
  | { type: 'CARDS_REVEALED'; payload: { votes: Record<string, CardValue> } }
  | { type: 'ROUND_RESET'; payload: { story: string } }
  | { type: 'ERROR'; payload: { message: string } };
