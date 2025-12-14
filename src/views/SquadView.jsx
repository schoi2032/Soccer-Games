import { useTeamStore, formations } from '../store/teamStore'
import PlayerCard from '../components/ui/PlayerCard'
import { useState } from 'react'

const SquadView = () => {
    const { lineup, myPlayers, activeFormation, setLineupSlot, setFormation } = useTeamStore()
    const [selectedSlot, setSelectedSlot] = useState(null)

    const currentFmt = formations[activeFormation]

    const getPlayerInSlot = (slotId) => {
        const pId = lineup[slotId]
        return myPlayers.find(p => p.id === pId)
    }

    return (
        <div className="flex h-full bg-slate-800">
            {/* Pitch View (Left/Center) */}
            <div className="flex-1 relative bg-green-800 overflow-hidden flex items-center justify-center">
                {/* Field Lines (Simple CSS) */}
                <div className="absolute inset-4 border-2 border-white/30 rounded-lg"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/30"></div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

                {/* Formation Setup */}
                <div className="relative w-full max-w-2xl h-[80%]">
                    {currentFmt.positions.map(pos => {
                        const player = getPlayerInSlot(pos.id)
                        // Map formation x/y (-3 to 3, 0 to 5) to percentages
                        const left = 50 + (pos.x * 12) + '%'
                        const bottom = 5 + (pos.y * 15) + '%'

                        return (
                            <div
                                key={pos.id}
                                className="absolute transform -translate-x-1/2 transition-all duration-500"
                                style={{ left, bottom }}
                                onClick={() => setSelectedSlot(pos.id)}
                            >
                                <div className={`relative ${selectedSlot === pos.id ? 'z-10 scale-110' : ''} transition-transform`}>
                                    <PlayerCard player={player} small />
                                    {/* Role Label */}
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-black/50 text-white px-1 rounded uppercase">
                                        {pos.role}
                                    </div>
                                    {!player && <div className="absolute inset-0 bg-black/20 rounded animate-pulse" />}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Formation Selector */}
                <div className="absolute top-4 right-4 bg-black/80 p-2 rounded text-white z-20">
                    <select
                        className="bg-transparent font-bold outline-none cursor-pointer"
                        value={activeFormation}
                        onChange={(e) => setFormation(e.target.value)}
                    >
                        {Object.keys(formations).map(k => (
                            <option key={k} value={k}>{k}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Side Panel (Bench / Selection) */}
            {selectedSlot && (
                <div className="w-80 bg-slate-900 border-l border-white/10 p-4 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4 text-white">
                        <h3 className="font-bold text-lg">Select Player</h3>
                        <button onClick={() => setSelectedSlot(null)} className="text-white/50 hover:text-white">✕</button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {myPlayers.map(p => {
                            // Ideally filter out players already selected in OTHER slots
                            const isUsed = Object.values(lineup).includes(p.id)
                            const isCurrentSlot = lineup[selectedSlot] === p.id

                            if (isUsed && !isCurrentSlot) return null // Hide already fielded players

                            return (
                                <div key={p.id} onClick={() => {
                                    setLineupSlot(selectedSlot, p.id)
                                    setSelectedSlot(null)
                                }}>
                                    <PlayerCard player={p} small />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SquadView
