import { getStats } from "./stats"
import { useStore } from './state';

const StatGuesses = () => {

    const stats = getStats();
    const { state } = useStore();

    const guessesArray = state.board.map((item, index) => stats.guesses[index+1]);
    const maxGuesses = Math.max(...guessesArray);

    console.log(maxGuesses)
    console.log(state.currentRow)

    return (
            <div className="stat-guesses">
                <div className="stat-guesses-title">
                    Distribuzione dei risultati
                </div>
                <div className="stat-guesses-container">
                    
                    {state.board.map((item, index) =>
                        <div className="stat-guesses-row" key={index}>
                            <div className="stat-guesses-label">
                                {index+1}
                            </div>
                            <div
                                className={"stat-guesses-value " + (state.currentRow === index+1 ? "green" : "")}
                                style={{ width: (stats.guesses[index+1] / maxGuesses * 100) + '%' }}
                                >
                                {stats.guesses[index+1]}
                            </div>
                        </div>
                    )}

                </div>
            </div>
    )
}

export default StatGuesses;