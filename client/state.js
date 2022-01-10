import { useReducer, createContext, useContext } from "react";
import possibleWords from '../server/possibleWords.json';
import { getSolution } from "./utils";

const TRIES = 6;
const WORD_LENGTH = 5;

const evaluateWord = (line, word) => {
    let checked = word + ''
    let answer = Array(WORD_LENGTH).fill(' ');

    for (let i = 0; i < line.length; i++) {
        if (line[i] === word[i]) {
            const found = checked.indexOf(line[i])
            answer[i] = 'c' // correct
            checked = checked.substring(0, found) + checked.substring(found + 1, checked.length)
        }
    }
    
    for (let i = 0; i < line.length; i++) {
        if (answer[i] !== 'c') {
            const found = checked.indexOf(line[i])
            if (found > -1 ) {
                checked = checked.substring(0, found) + checked.substring(found + 1, checked.length)
                answer[i] = 'p' // present
            } else {
                answer[i] = 'a' // absent
            }
        }
    }
    
    return answer.join('');
}

const init = (state) => {

    const gameMode = state && state.gameMode || 'daily';
    const solution = getSolution(gameMode);
    console.log(state)

    if (gameMode === 'daily' && state && state.solution === solution) {
        return state;
    }

    return {
        board: Array(TRIES).fill('').map(() => Array(WORD_LENGTH).fill(' ').join('')),
        evaluations: Array(TRIES).fill('').map(() => Array(WORD_LENGTH).fill(' ').join('')),
        currentRow: 0,
        currentColumn: 0,
        gameStatus: 'IN_PROGRESS',
        modal: '',
        solution,
        gameMode // possible values: 'random', 'daily'
    };
};

const getSavedState = () => {
    try {
        const state = localStorage.getItem('state');
        return state ? JSON.parse(state) : null;
    } catch {
        return null;
    }
}

const initialState = init(getSavedState());

const reducer = (state, action) => {
    let newState = { ...state };
    // console.log(action);

    if (action.type === 'TOGGLE_GAME_MODE') {
        // TODO: chiedere all'utente se vuole cambiare il modo di gioco
        newState = init({ gameMode: state.gameMode === 'random' ? 'daily' : 'random' });
    }

    if (action.type === 'ADD_LETTER') {
        if (state.currentColumn < 5) {
            newState.board[state.currentRow] = state.board[state.currentRow].substr(0, state.currentColumn) + action.letter + state.board[state.currentRow].substr(state.currentColumn + 1);
            newState.currentColumn = state.currentColumn + 1;
        }
    }

    if (action.type === 'DELETE_LETTER') {
        if (state.currentColumn > 0) {
            newState.board[state.currentRow] = state.board[state.currentRow].substr(0, state.currentColumn - 1)+ ' ' + state.board[state.currentRow].substr(state.currentColumn);
            newState.currentColumn = state.currentColumn - 1;
        }
    }

    if (action.type === 'NEXT_ROW') {
        if (state.board[state.currentRow].indexOf(' ') > -1) {
            alert('Inserisci tutte le lettere della parola per proseuire');
            return newState;
        }
        if (possibleWords.indexOf(state.board[state.currentRow]) === -1) {
            alert('La parola inserita non è valida');
            return newState;
        }
        if (state.currentRow < state.board.length - 1) {
            newState.evaluations[state.currentRow] = evaluateWord(state.board[state.currentRow], state.solution);
            newState.currentRow = state.currentRow + 1;
            newState.currentColumn = 0;

            if (newState.evaluations[state.currentRow] === Array(WORD_LENGTH).fill('c').join('')) {
                newState.gameStatus = 'WIN';
            }
        }
        if (state.currentRow === state.board.length - 1) {
            newState.evaluations[state.currentRow] = evaluateWord(state.board[state.currentRow], state.solution);
            if (newState.evaluations[state.currentRow] === Array(WORD_LENGTH).fill('c').join('')) {
                newState.gameStatus = 'WIN';
            } else {
                newState.gameStatus = 'FAIL';
            }
        }
        localStorage.setItem('state', JSON.stringify(newState));
    }

    if (action.type === 'CLOSE_MODAL') {
        newState.modal = '';
    }

    if (action.type === 'OPEN_MODAL') {
        newState.modal = action.modal;
    }

    if (action.type === 'RESET') {
        localStorage.removeItem('state');
        newState = init();
    }

    // console.log(newState)

    return newState;
};


export const StoreContext = createContext({ state: initialState, dispatch: () => {} });

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext);