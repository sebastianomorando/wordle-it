const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('60000_parole_italiane.txt')
});

const words = [];

rl.on('line', (line) => {
    let word = line.replace("e'", 'è');
    word = word.replace("a'", "à");
    if (word.length === 5) {
        words.push(word);
    }
});

rl.on('close', () => {
    words.push('città');
    words.push('assai');
    words.push('gatto');
    words.push('pietà');
    words.push('caffè');
    words.push('cesto');
    fs.writeFileSync( 'possibleWords.json', JSON.stringify(words) );
})