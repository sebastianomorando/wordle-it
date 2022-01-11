/*
{
    "currentStreak": 2,
    "maxStreak": 2,
    "guesses": {
        "1": 1,
        "2": 2,
        "3": 1,
        "4": 0,
        "5": 0,
        "6": 0,
        "fail": 1
    },
    "winPercentage": 80,
    "gamesPlayed": 5,
    "gamesWon": 4,
    "averageGuesses": 2
}

*/

const getStats = () => {
    const initialStats = {
        "currentStreak": 0,
        "maxStreak": 0,
        "guesses": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "fail": 0
        },
        "winPercentage": 0,
        "gamesPlayed": 0,
        "gamesWon": 0,
        "averageGuesses": 0
    }
    try {
        const stats = JSON.parse(localStorage.getItem('stats'));
        return {
            ...initialStats,
            ...stats
        }
    } catch (e) {
        return initialStats;
    }
}

export const updateStats = (state) => {
    const stats = getStats();
    stats.gamesPlayed++;
    if (state.gameStatus === 'WIN') {
        stats.gamesWon++;
        stats.currentStreak++;
        stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
        stats.guesses[state.currentRow+'']++;
    }
    if (state.gameStatus === 'FAIL') {
        stats.guesses.fail++;
    }
    localStorage.setItem('stats', JSON.stringify(stats));
}