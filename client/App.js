import { useEffect, useLayoutEffect } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './style.css';
import { useStore } from './state';
import { Tile } from './Tile';
import { Row } from './Row';
import Modal from './Modal';

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
        used.forEach(letter => {
            const el = document.querySelector(`[data-skbtn="${letter}"]`);
            el.classList.add('used');
        });
        present.forEach(letter => {
            const el = document.querySelector(`[data-skbtn="${letter}"]`);
            el.classList.add('present');
        });
        correct.forEach(letter => {
            const el = document.querySelector(`[data-skbtn="${letter}"]`);
            el.classList.add('correct');
        });
    }, [state.currentRow]);
    
    return (
        <>
            <header>
                <h1>WORDLE 🇮🇹</h1>
                <div className='info' onClick={() => { dispatch({ type: 'OPEN_MODAL', modal: 'INFO' }) }}>🛈</div>
            </header>
            <div className='board' style={{ width: '330px' }}>
                {state.board.map((word, row) => <Row key={row}>
                    {word.split('').map((letter, col) => <Tile evaluation={state.evaluations[row][col]} key={col}>{letter}</Tile>)}
                </Row>)}
            </div>
            <Keyboard layout={{
                    default: ['q w e r t y u i o p', 'a s d f g h j k l', '{enter} z x c v b n m {backspace}']
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
            <Modal open={state.gameStatus === 'WIN'}>
                <h3>Complimenti, hai indovinato la parola corretta!</h3>
                <button onClick={() => { dispatch({ type: 'RESET' }) }}>GIOCA ANCORA</button>
            </Modal>
            <Modal open={state.gameStatus === 'FAIL'}>
                <h3>Non hai indovinato, la parola corretta è {state.solution}</h3>
                <button onClick={() => { dispatch({ type: 'RESET' }) }}>GIOCA ANCORA</button>
            </Modal>
            <Modal open={state.modal === 'INFO'}>
                Clone in lingua italiano del gioco Wordle
                (<a target='blank' href='https://www.powerlanguage.co.uk/wordle/'>https://www.powerlanguage.co.uk/wordle/</a>) 
                idea originale di <a target='blank' href='https://www.powerlanguage.co.uk/'>https://www.powerlanguage.co.uk/</a>
                <br />
                <br />
                La lista di parole è stata estratta da <a target='blank' href='https://github.com/napolux/paroleitaliane'>https://github.com/napolux/paroleitaliane</a>	
                <br />
                <br />
                <button onClick={() => { dispatch({ type: 'CLOSE_MODAL' }) }}>CHIUDI</button>
            </Modal>
        </>
    );
}

export default App;