import { useGameStore } from '../store/gameStore'

const Interface = () => {
    const { home, away } = useGameStore(state => state.score)

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-white font-bold text-4xl drop-shadow-md">Web Soccer</h1>
                    <p className="text-white/80 text-sm">FIFA-style Web Demo</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                    <div className="text-white font-mono text-2xl font-bold">{home} - {away}</div>
                    <div className="text-white/60 text-xs text-center">SCORE</div>
                </div>
            </div>

            {/* Controls Help */}
            <div className="flex justify-end items-end">
                <div className="bg-black/50 backdrop-blur-md p-6 rounded-xl border border-white/10 text-white space-y-2">
                    <h3 className="font-bold border-b border-white/20 pb-2 mb-2">Controls</h3>
                    <div className="flex items-center gap-4">
                        <span className="font-mono bg-white/20 px-2 py-1 rounded">WASD / Arrows</span>
                        <span>Move</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-mono bg-white/20 px-2 py-1 rounded">Space</span>
                        <span>Shoot</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-mono bg-white/20 px-2 py-1 rounded">Shift</span>
                        <span>Sprint</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interface
