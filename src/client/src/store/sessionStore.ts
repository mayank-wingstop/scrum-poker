import { create } from 'zustand';

interface SessionState {
  sessionId: string | null;
  participantId: string | null;
  setSession: (sessionId: string, participantId: string) => void;
}

const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  participantId: null,
  setSession: (sessionId, participantId) => set({ sessionId, participantId }),
}));

export default useSessionStore;
