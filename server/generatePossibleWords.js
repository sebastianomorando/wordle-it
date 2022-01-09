const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('60000_parole_italiane.txt')
});

const words = [];

rl.on('line', (line) => {
    line.length === 5 && words.push(line);
});

rl.on('close', () => {
    fs.writeFileSync( 'possibleWords.json', JSON.stringify(words) );
})