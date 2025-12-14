import { create } from 'zustand'

export const useGameStore = create((set) => ({
    playerPos: [0, 0, 0],
    playerDir: [0, 0, 1],
    score: { home: 0, away: 0 },
    setPlayerState: (pos, dir) => set({ playerPos: pos, playerDir: dir }),
    goal: (side) => set((state) => ({ score: { ...state.score, [side]: state.score[side] + 1 } })),
}))
