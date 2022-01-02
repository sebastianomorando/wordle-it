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
    fs.writeFileSync( 'words.json', JSON.stringify(words) );
})