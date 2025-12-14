import { useState } from 'react'
import GameScene from './components/GameScene'
import Interface from './components/Interface'
import MarketView from './views/MarketView'
import SquadView from './views/SquadView'
import { useTeamStore } from './store/teamStore'

function App() {
    const [view, setView] = useState('menu') // menu, market, squad, game
    const credits = useTeamStore(state => state.credits)

    // Main Menu Component
    const Menu = () => (
        <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-white">
            <div className="mb-12 text-center">
                <h1 className="text-8xl font-black tracking-tighter mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent transform -skew-x-10">
                    ULTIMATE<br />SOCCER
                </h1>
                <p className="text-xl text-white/60 tracking-widest uppercase">Manager Edition</p>
            </div>

            <div className="grid grid-cols-3 gap-6 w-full max-w-4xl px-8">
                <button
                    onClick={() => setView('game')}
                    className="group relative h-64 bg-gradient-to-br from-green-600 to-emerald-800 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-all"
                >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
                    <div className="absolute bottom-6 left-6 text-left">
                        <div className="text-4xl font-black italic">KICK OFF</div>
                        <div className="text-sm font-bold opacity-80 mt-1">PLAY MATCH</div>
                    </div>
                </button>

                <button
                    onClick={() => setView('squad')}
                    className="group relative h-64 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-all"
                >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
                    <div className="absolute bottom-6 left-6 text-left">
                        <div className="text-4xl font-black italic">MY CLUB</div>
                        <div className="text-sm font-bold opacity-80 mt-1">MANAGE SQUAD</div>
                    </div>
                </button>

                <button
                    onClick={() => setView('market')}
                    className="group relative h-64 bg-gradient-to-br from-yellow-500 to-amber-700 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-all"
                >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
                    <div className="absolute bottom-6 left-6 text-left">
                        <div className="text-4xl font-black italic">TRANSFERS</div>
                        <div className="text-sm font-bold opacity-80 mt-1">BUY PLAYERS</div>
                    </div>
                </button>
            </div>

            <div className="mt-12 bg-black/30 px-6 py-2 rounded-full border border-white/10">
                <span className="text-yellow-400 font-bold mr-2">CREDITS:</span>
                <span className="font-mono text-xl">{credits.toLocaleString()}</span>
            </div>
        </div>
    )

    const Navbar = ({ title }) => (
        <div className="absolute top-0 left-0 right-0 h-16 bg-slate-900 border-b border-white/10 flex items-center px-8 z-50">
            <button
                onClick={() => setView('menu')}
                className="text-white/70 hover:text-white font-bold flex items-center"
            >
                ← BACK TO HOME
            </button>
            <div className="ml-auto flex items-center gap-4">
                <span className="text-yellow-400 font-bold text-sm">💰 {credits.toLocaleString()}</span>
            </div>
        </div>
    )

    return (
        <div className="w-full h-full relative bg-slate-900 overflow-hidden font-sans select-none">
            {view === 'menu' && <Menu />}

            {view === 'market' && (
                <div className="w-full h-full pt-16">
                    <Navbar title="Market" />
                    <MarketView />
                </div>
            )}

            {view === 'squad' && (
                <div className="w-full h-full pt-16">
                    <Navbar title="Squad" />
                    <SquadView />
                </div>
            )}

            {view === 'game' && (
                <>
                    <div className="absolute top-4 left-4 z-50">
                        <button
                            onClick={() => setView('menu')}
                            className="bg-black/50 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-600 transition"
                        >
                            QUIT MATCH
                        </button>
                    </div>
                    <GameScene />
                    <Interface />
                </>
            )}
        </div>
    )
}

export default App
