import words from '../server/words.json';

const dayDifference = (date1, date2) => {
    const diff = date2.getTime() - date1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export const dailyIndex = dayDifference(new Date(2022, 6, 4), new Date());

export const getSolution = (gameMode) => {
    // possible gameModes = 'random', 'daily'
    if (gameMode === 'random') {
        return words[Math.random() * words.length | 0];
    }
    if (gameMode === 'daily') {
        return words[dailyIndex];
    }
};
