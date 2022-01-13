const words = require('./words.json');
const possibleWords = require('./possibleWords.json');

console.log(words.length);
console.log(possibleWords.length);
const characters = new Set();
const possibleCharacters = new Set();

words.forEach( (word, index) => {
    if (!possibleWords.includes(word)) {
        console.log( index + ' assente: ' + word);
    }
    // controlla se ha lettere accentate
    // word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    if (word.indexOf('à') !== -1) {
        console.log(index + ' accentate: ' + word);
    }
    if (word.indexOf('è') !== -1) {
        console.log(index + ' accentate: ' + word);
    }
    word.split('').forEach( (char) => {
        characters.add(char);
    });
});

console.log('-------------------');

possibleWords.forEach( (word) => {
    word.split('').forEach( (char) => {
        possibleCharacters.add(char);
    });
    if (word.indexOf("'") !== -1) {
        console.log(word);
    }
    if (word.indexOf("y") !== -1) {
        console.log(word);
    }
    if (word.indexOf("k") !== -1) {
        console.log(word);
    }
});

console.log(characters, characters.size);
console.log(possibleCharacters, possibleCharacters.size);