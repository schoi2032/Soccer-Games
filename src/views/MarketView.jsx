import { useTeamStore } from '../store/teamStore'
import PlayerCard from '../components/ui/PlayerCard'

const MarketView = () => {
    const { credits, marketPlayers, buyPlayer } = useTeamStore()

    return (
        <div className="flex flex-col h-full bg-slate-900 p-8 overflow-hidden">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl text-white font-bold tracking-tighter">Transfer Market</h1>
                    <p className="text-white/50">Recruit top talent for your Ultimate Team.</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 px-6 py-2 rounded-full font-bold text-xl">
                    Credits: {credits.toLocaleString()}
                </div>
            </header>

            <div className="flex-1 overflow-y-auto pb-20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {marketPlayers.map(player => (
                        <div key={player.id} className="flex flex-col items-center group">
                            <PlayerCard
                                player={player}
                                showPrice
                                onClick={() => {
                                    if (confirm(`Buy ${player.name} for ${player.price}?`)) {
                                        if (!buyPlayer(player)) alert("Not enough credits!")
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MarketView
