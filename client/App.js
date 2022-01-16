import { useEffect, useLayoutEffect, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './style.css';
import { useStore } from './state';
import { Tile } from './Tile';
import { Row } from './Row';
import Modal from './Modal';
import { dailyIndex } from './utils';
import Countdown from './Countdown';
import { Nightmode } from './Nightmode';
import Cog from './icons/Cog';
import QuestionMark from './icons/QuestionMark';
import StatContainer from './StatContainer';

const getKeys = (state) => {
    const used = new Set();
    const present = new Set();
    const correct = new Set();

    for (let i = 0; i < state.board.length; i++) {
        for (let j = 0; j < state.board[i].length; j++) {
            const letter = state.board[i][j];
            if (letter !== ' ') {
                used.add(letter);
                if (state.solution.indexOf(letter) > -1) {
                    present.add(letter);
                }
                if (state.solution[j] === letter) {
                    correct.add(letter);
                }
            }
        }
    }

    return {
        used,
        present,
        correct
    }
}

const evaluationToTile = {
    'c': '🟩',
    'p': '🟨',
    'a': '⬜'
}

const share = (state) => {
    let shareText = `VERBA ${dailyIndex} ${state.currentRow}/${state.board.length} \n\n`;
    if (state.gameStatus === 'FAIL') {
        shareText = `VERBA ${dailyIndex} X/${state.board.length} \n\n`;
    }
    for (let i = 0; i < state.evaluations.length; i++) {
        const evaluation = state.evaluations[i];
        if (evaluation === '     ') break;
        evaluation.split('').forEach((letter) => {
            shareText += evaluationToTile[letter];

        });
        shareText += '\n';
    }
    // copy to clipboard
    const el = document.createElement('textarea');
    el.value = shareText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Copiato negli appunti');
}

const App = () => {

    const { state, dispatch } = useStore();

    useEffect(() => {

        const handleKeyDown = (e) => {
            if (e.which >= 65 && e.which <= 90) {
                const key = String.fromCharCode(e.which).toLowerCase();
                dispatch({ type: 'ADD_LETTER', letter: key });
            }

            if (e.which === 8) {
                dispatch({ type: 'DELETE_LETTER' });
            }

            if (e.which === 13) {
                dispatch({ type: 'NEXT_ROW' });
            }
        }

        document.addEventListener('keyup', handleKeyDown);
        return () => {
            document.removeEventListener('keyup', handleKeyDown);
        }
    }, [])

    useLayoutEffect(() => {
        const { used, present, correct } = getKeys(state);
        console.log(used, present, correct);
        setTimeout(() => {
            document.querySelectorAll('[data-skbtn]').forEach((el) => {
                el.classList.remove('used', 'present', 'correct');
            });
            used.forEach(letter => {
                const el = document.querySelector(`[data-skbtn="${letter}"]`);
                el && el.classList.add('used');
            });
            present.forEach(letter => {
                const el = document.querySelector(`[data-skbtn="${letter}"]`);
                el && el.classList.add('present');
            });
            correct.forEach(letter => {
                const el = document.querySelector(`[data-skbtn="${letter}"]`);
                el && el.classList.add('correct');
            });
        }, 0);
    }, [state.currentRow, state.gameStatus, state.gameMode]);
    
    return (
        <>
            <header>
                <h1>VERBA</h1>
                <div className='info' onClick={() => { dispatch({ type: 'OPEN_MODAL', modal: 'INFO' }) }}><QuestionMark /></div>
                <div className='game-mode' onClick={() => { dispatch({ type: 'TOGGLE_GAME_MODE' }) }}>{state.gameMode}</div>
            </header>
            <div className='board'>
                {state.board.map((word, row) => <Row key={row}>
                    {word.split('').map((letter, col) => <Tile evaluation={state.evaluations[row][col]} key={col}>{letter}</Tile>)}
                </Row>)}
            </div>
            <Keyboard layout={{
                    default: ['q e è r t u i o p', 'a à s d f g h j l', '{enter} z x c v b n m {backspace}']
                }}
                display={{
                    '{enter}': 'Invio',
                    '{backspace}': '⌫'
                }}
                onKeyPress={ (input) => {
                    if (input === '{enter}') {
                        dispatch({ type: 'NEXT_ROW' });
                    } else if (input === '{backspace}') {
                        dispatch({ type: 'DELETE_LETTER' });
                    } else {
                        dispatch({ type: 'ADD_LETTER', letter: input });
                    }
                } }
            />
            <Modal open={state.gameStatus === 'WIN' && state.modal === 'STATS'}>
                <h3>Complimenti, hai indovinato la parola corretta in {state.currentRow} tentativi!</h3>
                <StatContainer />
                {state.gameMode === 'random' && <button className='btn' onClick={() => { dispatch({ type: 'RESET' }) }}> GIOCA ANCORA </button> }
                
                {state.gameMode === 'daily' &&
                    <>
                        <button className='btn' onClick={() => { share(state) }}>
                            CONDIVIDI
                        </button>
                        <Countdown />
                    </>
                }
            </Modal>
            <Modal open={state.gameStatus === 'FAIL'  && state.modal === 'STATS' }>
                <h3>Non hai indovinato, la parola corretta è "{state.solution.toUpperCase()}"</h3>
                <StatContainer />
                {state.gameMode === 'random' && <button className='btn' onClick={() => { dispatch({ type: 'RESET' }) }}>GIOCA ANCORA</button> }
                {state.gameMode === 'daily' &&
                    <>
                        <button className='btn' onClick={() => { share(state) }}>
                            CONDIVIDI
                        </button>
                        <Countdown />
                    </>
                }
            </Modal>
            <Modal open={state.modal === 'INFO'}>
                
                <Nightmode />
               
                Indovina la parola in 6 tentativi.<br /><br />
                Ogni tentativo deve essere una parola valida di 5 lettere, premi invio per passare alla parola successiva.
                <br /><br />
                Clone in lingua italiana del gioco&nbsp;
                <a target='blank' href='https://www.powerlanguage.co.uk/wordle/'>Wordle</a>, nato
                come esercizio di sviluppo di una applicazione web in React.<br/><br/>
                Il progetto è un work in progress continuo e fatto per la maggior parte in live, 
                che potete seguire sul mio canale <a target='blank' href='https://www.twitch.tv/mastornadettofernet>'>Twitch</a>
                <br/>
                <br />
                Idea originale di <a target='blank' href='https://www.powerlanguage.co.uk/'>Josh Wardle (Powerlanguage)</a>
                <br />
                <br />
                La lista di parole è stata estratta da <a target='blank' href='https://github.com/napolux/paroleitaliane'>https://github.com/napolux/paroleitaliane</a>	
                <br />
                <br />
                Feedback:&nbsp;
                <a target='blank' href='https://github.com/sebastianomorando/wordle-it'>Github (codice sorgente)</a> |&nbsp;
                <a target='blank' href='https://twitter.com/dettofernet'>Twitter</a>
            </Modal>
        </>
    );
}

export default App;