import { getStats } from "./stats"

const StatContainer = () => {

    const stats = getStats();

    return (
        <>
        <div className='stats-title'>STATISTICHE</div>
        <div className="stat-container">
            <div className="stat-row">
                
                <div className="stat-item">
                    <div className="stat-value">
                        {stats.gamesPlayed}
                    </div>
                    <div className="stat-item-label">
                        Giocate
                    </div>
                </div>

                <div className="stat-item">
                    <div className="stat-value">
                        {stats.winPercentage}
                    </div>
                    <div className="stat-item-label">
                        Vinte %
                    </div>
                </div>

                <div className="stat-item">
                    <div className="stat-value">
                        {stats.currentStreak}
                    </div>
                    <div className="stat-item-label">
                        Current Streak
                    </div>
                </div>

                <div className="stat-item">
                    <div className="stat-value">
                        {stats.maxStreak}
                    </div>
                    <div className="stat-item-label">
                        Max Streak
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

export default StatContainer;