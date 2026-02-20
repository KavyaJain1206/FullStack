import { useGlobalContext } from './context/GlobalContext';
import './App.css';

function App() {
    const { count, setCount } = useGlobalContext();

    return (
        <div className="futuristic-container">
            <div className="card">
                <h1>Global Context</h1>
                <div className="counter-display">
                    {count}
                </div>
                <div className="btn-group">
                    <button
                        className="decrement"
                        onClick={() => setCount((prev) => prev - 1)}
                    >
                        -
                    </button>
                    <button
                        className="increment"
                        onClick={() => setCount((prev) => prev + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
