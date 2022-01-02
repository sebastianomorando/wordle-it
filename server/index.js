const fs = require('fs');
const readline = require('readline');
const colors = require('./ansiColors.js');

const rl = readline.createInterface({
    input: fs.createReadStream('1000_parole_italiane_comuni.txt')
});

const words = [];

rl.on('line', (line) => {
    line.length === 5 && words.push(line);
});

rl.on('close', () => {

    const word = words[Math.random() * words.length | 0]

    const rlc = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let tries = 0;

    rlc.on('line', (line) => {
        if (line === 'exit') {
            rlc.close();
            return;
        }
        tries++;
        let answer = ''
        for (let i = 0; i < line.length; i++) {
            if (line[i] === word[i]) {
                answer += colors.FgGreen + line[i] + colors.Reset
            } else {
                if (word.indexOf(line[i]) > -1) {
                    answer += colors.FgYellow + line[i] + colors.Reset
                } else {
                    answer += colors.FgRed + line[i] + colors.Reset
                }
            }
         }
        console.log(answer)
        if (word === line || tries >= 5) {
            rlc.close();
        }
    });
   
})

/*  
    1. la lettera è nella parola e nel posto giusto
    2. la lettera è nella parola ma nel posto sbagliato
    3. la lettera non è nella parola
 */