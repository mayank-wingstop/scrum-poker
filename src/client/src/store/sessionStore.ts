import { create } from 'zustand';

// Stub Zustand store — will be populated in feature-specific coding stages
interface SessionState {
  sessionId: string | null;
  participantId: string | null;
}

const useSessionStore = create<SessionState>(() => ({
  sessionId: null,
  participantId: null,
}));

export default useSessionStore;
