import { create } from 'zustand'

export const formations = {
    '4-4-2': {
        name: '4-4-2',
        positions: [
            { id: 'gk', role: 'GK', x: 0, y: 0 },
            { id: 'lb', role: 'DEF', x: -3, y: 1 },
            { id: 'cb1', role: 'DEF', x: -1, y: 1 },
            { id: 'cb2', role: 'DEF', x: 1, y: 1 },
            { id: 'rb', role: 'DEF', x: 3, y: 1 },
            { id: 'lm', role: 'MID', x: -3, y: 2.5 },
            { id: 'cm1', role: 'MID', x: -1, y: 2.5 },
            { id: 'cm2', role: 'MID', x: 1, y: 2.5 },
            { id: 'rm', role: 'MID', x: 3, y: 2.5 },
            { id: 'st1', role: 'FWD', x: -1, y: 4 },
            { id: 'st2', role: 'FWD', x: 1, y: 4 },
        ]
    },
    '4-3-3': {
        name: '4-3-3',
        positions: [
            { id: 'gk', role: 'GK', x: 0, y: 0 },
            { id: 'lb', role: 'DEF', x: -3, y: 1 },
            { id: 'cb1', role: 'DEF', x: -1, y: 1 },
            { id: 'cb2', role: 'DEF', x: 1, y: 1 },
            { id: 'rb', role: 'DEF', x: 3, y: 1 },
            { id: 'cm1', role: 'MID', x: -2, y: 2.5 }, // CDM
            { id: 'cm2', role: 'MID', x: 0, y: 2.5 },
            { id: 'cm3', role: 'MID', x: 2, y: 2.5 },
            { id: 'lw', role: 'FWD', x: -3, y: 4 },
            { id: 'st', role: 'FWD', x: 0, y: 4.5 },
            { id: 'rw', role: 'FWD', x: 3, y: 4 },
        ]
    }
}

// Mock Database of Players
const INITIAL_MARKET = [
    { id: 1, name: 'Mbappe', rating: 91, role: 'FWD', price: 180000, speed: 97, shoot: 90, img: '⚡' },
    { id: 2, name: 'Haaland', rating: 91, role: 'FWD', price: 175000, speed: 89, shoot: 96, img: '🤖' },
    { id: 3, name: 'De Bruyne', rating: 91, role: 'MID', price: 120000, speed: 72, shoot: 88, img: '🎯' },
    { id: 4, name: 'Bellingham', rating: 90, role: 'MID', price: 150000, speed: 82, shoot: 85, img: '🌟' },
    { id: 5, name: 'Van Dijk', rating: 89, role: 'DEF', price: 100000, speed: 78, shoot: 60, img: '🧱' },
    { id: 6, name: 'Salah', rating: 89, role: 'FWD', price: 90000, speed: 93, shoot: 87, img: '👑' },
    { id: 7, name: 'Modric', rating: 86, role: 'MID', price: 40000, speed: 74, shoot: 76, img: '🧙' },
    { id: 8, name: 'Son', rating: 87, role: 'FWD', price: 55000, speed: 88, shoot: 89, img: '📷' },
    { id: 9, name: 'Saka', rating: 86, role: 'FWD', price: 45000, speed: 86, shoot: 81, img: '🌶️' },
    { id: 10, name: 'Rashford', rating: 84, role: 'FWD', price: 25000, speed: 90, shoot: 84, img: '🔥' },
    { id: 11, name: 'Rodri', rating: 89, role: 'MID', price: 85000, speed: 65, shoot: 78, img: '⚓' },
    { id: 12, name: 'Alison', rating: 89, role: 'GK', price: 60000, speed: 50, shoot: 40, img: '🧤' },
]

export const useTeamStore = create((set, get) => ({
    credits: 50000, // Starter Budget
    myPlayers: [
        // Starter Team (Low rated)
        { id: 101, name: 'Rookie FW', rating: 65, role: 'FWD', price: 0, speed: 70, shoot: 65, img: '👤' },
        { id: 102, name: 'Rookie FW', rating: 64, role: 'FWD', price: 0, speed: 68, shoot: 63, img: '👤' },
        { id: 103, name: 'Rookie MF', rating: 66, role: 'MID', price: 0, speed: 65, shoot: 60, img: '👤' },
        { id: 104, name: 'Rookie MF', rating: 63, role: 'MID', price: 0, speed: 64, shoot: 58, img: '👤' },
        { id: 105, name: 'Rookie MF', rating: 65, role: 'MID', price: 0, speed: 66, shoot: 61, img: '👤' },
        { id: 106, name: 'Rookie MF', rating: 62, role: 'MID', price: 0, speed: 63, shoot: 55, img: '👤' },
        { id: 107, name: 'Rookie DF', rating: 64, role: 'DEF', price: 0, speed: 60, shoot: 40, img: '👤' },
        { id: 108, name: 'Rookie DF', rating: 65, role: 'DEF', price: 0, speed: 62, shoot: 42, img: '👤' },
        { id: 109, name: 'Rookie DF', rating: 63, role: 'DEF', price: 0, speed: 61, shoot: 38, img: '👤' },
        { id: 110, name: 'Rookie DF', rating: 61, role: 'DEF', price: 0, speed: 58, shoot: 35, img: '👤' },
        { id: 111, name: 'Rookie GK', rating: 68, role: 'GK', price: 0, speed: 40, shoot: 30, img: '👤' },
    ],
    marketPlayers: INITIAL_MARKET,
    activeFormation: '4-4-2',
    lineup: {
        gk: 111,
        lb: 107, cb1: 108, cb2: 109, rb: 110,
        lm: 103, cm1: 104, cm2: 105, rm: 106,
        st1: 101, st2: 102
    },

    // Actions
    buyPlayer: (player) => {
        const { credits, myPlayers, marketPlayers } = get()
        if (credits >= player.price) {
            set({
                credits: credits - player.price,
                myPlayers: [...myPlayers, player],
                // For simplicity, market players are infinite or unique? Let's keep them in market too.
            })
            return true
        }
        return false
    },

    setFormation: (fmtName) => set({ activeFormation: fmtName }),

    setLineupSlot: (slotId, playerId) => {
        set((state) => ({
            lineup: { ...state.lineup, [slotId]: playerId }
        }))
    },

    // Get the full player object for the active controller
    getActivePlayerStats: () => {
        const { lineup, myPlayers } = get()
        // Default to a striker for the single player demo
        const spId = lineup['st1'] || lineup['st'] || myPlayers[0].id
        return myPlayers.find(p => p.id === spId) || myPlayers[0]
    }
}))
