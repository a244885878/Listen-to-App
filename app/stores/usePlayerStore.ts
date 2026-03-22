import { create } from 'zustand';

interface PlayerState {
  currentTrack: string | null;
  isPlaying: boolean;
  setCurrentTrack: (track: string | null) => void;
  setPlaying: (playing: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setPlaying: (playing) => set({ isPlaying: playing }),
}));
