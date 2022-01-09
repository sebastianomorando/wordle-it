const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('1000_parole_italiane_comuni.txt')
});

const words = [];

rl.on('line', (line) => {
    line.length === 5 && words.push(line);
});

rl.on('close', () => {
    // shuffle words
    words.sort(() => Math.random() - 0.5);
    fs.writeFileSync( 'words.json', JSON.stringify(words) );
})