import { useEffect } from 'react';
import './style.css';
import { useStore } from './state';
import { Tile } from './Tile';
import { Row } from './Row';
import Modal from './Modal';

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
    
    return (
        <>
            <div className='board' style={{ width: '330px' }}>
                {state.board.map((word, row) => <Row key={row}>
                    {word.split('').map((letter, col) => <Tile evaluation={state.evaluations[row][col]} key={col}>{letter}</Tile>)}
                </Row>)}
            </div>
            <Modal open={state.gameStatus === 'WIN'}>
                <h3>Complimenti, hai indovinato la parola corretta!</h3>
                <button onClick={() => { dispatch({ type: 'RESET' }) }}>GIOCA ANCORA</button>
            </Modal>
            <Modal open={state.gameStatus === 'FAIL'}>
                <h3>Non hai indovinato, la parola corretta è {state.solution}</h3>
                <button onClick={() => { dispatch({ type: 'RESET' }) }}>GIOCA ANCORA</button>
            </Modal>
        </>
    );
}

export default App;