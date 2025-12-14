const PlayerCard = ({ player, onClick, showPrice = false, small = false }) => {
    if (!player) return <div className={`bg-white/5 border border-white/10 rounded-lg ${small ? 'w-16 h-20' : 'w-32 h-44'} flex items-center justify-center text-white/20`}>Empty</div>

    // Rarity Color
    const getBg = (r) => {
        if (r >= 90) return 'bg-gradient-to-b from-yellow-200 to-yellow-600 border-yellow-400' // Gold Rare
        if (r >= 80) return 'bg-gradient-to-b from-slate-200 to-slate-400 border-slate-300' // Silver/Gold
        return 'bg-gradient-to-b from-stone-400 to-stone-600 border-stone-500' // Bronze
    }

    if (small) {
        return (
            <div
                onClick={onClick}
                className={`${getBg(player.rating)} w-16 h-20 rounded-md p-1 flex flex-col items-center justify-center relative shadow-lg cursor-pointer transform hover:scale-105 transition border-2 text-slate-800`}
            >
                <div className="text-xl">{player.img}</div>
                <div className="font-bold text-sm leading-none">{player.name.substring(0, 3)}</div>
                <div className="text-xs font-mono">{player.rating}</div>
            </div>
        )
    }

    return (
        <div
            onClick={onClick}
            className={`${getBg(player.rating)} w-40 h-56 rounded-t-xl rounded-b-md p-2 flex flex-col relative shadow-2xl cursor-pointer transform hover:-translate-y-2 transition duration-200 border-4 border-double border-opacity-50 text-slate-900`}
        >
            {/* Top Stats */}
            <div className="flex justify-between items-start">
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold leading-none">{player.rating}</span>
                    <span className="text-xs font-bold uppercase">{player.role}</span>
                </div>
                <div className="text-4xl absolute top-4 left-1/2 -translate-x-1/2 drop-shadow-md">
                    {player.img}
                </div>
            </div>

            {/* Name */}
            <div className="mt-14 text-center border-b-2 border-slate-900/10 pb-1 mb-1">
                <h3 className="font-bold text-lg uppercase tracking-tight truncate">{player.name}</h3>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-0 text-xs font-bold px-2 flex-1">
                <div className="flex justify-between"><span>PAC</span><span>{player.speed}</span></div>
                <div className="flex justify-between"><span>DRI</span><span>{Math.floor((player.speed + player.shoot) / 2)}</span></div>
                <div className="flex justify-between"><span>SHO</span><span>{player.shoot}</span></div>
                <div className="flex justify-between"><span>DEF</span><span>{Math.max(40, 90 - player.shoot)}</span></div>
                <div className="flex justify-between"><span>PAS</span><span>{Math.floor(player.rating * 0.9)}</span></div>
                <div className="flex justify-between"><span>PHY</span><span>{Math.floor(player.rating * 0.85)}</span></div>
            </div>

            {/* Price Tag */}
            {showPrice && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black text-yellow-400 px-3 py-1 rounded-full text-sm font-bold shadow-lg border border-yellow-500 whitespace-nowrap">
                    💰 {player.price.toLocaleString()}
                </div>
            )}
        </div>
    )
}

export default PlayerCard
