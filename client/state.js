import { useReducer, createContext, useContext } from "react";
import words from '../server/words.json';

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

const init = () => ({
    board: Array(TRIES).fill('').map(() => Array(WORD_LENGTH).fill(' ').join('')),
    evaluations: Array(TRIES).fill('').map(() => Array(WORD_LENGTH).fill(' ').join('')),
    currentRow: 0,
    currentColumn: 0,
    gameStatus: 'IN_PROGRESS',
    solution: words[Math.random() * words.length | 0],
    modal: ''
});

const initialState = init();

const reducer = (state, action) => {
    const newState = { ...state };
    // console.log(action);

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
        
    }

    if (action.type === 'CLOSE_MODAL') {
        newState.modal = '';
    }

    if (action.type === 'OPEN_MODAL') {
        newState.modal = action.modal;
    }

    if (action.type === 'RESET') {
        return init();
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