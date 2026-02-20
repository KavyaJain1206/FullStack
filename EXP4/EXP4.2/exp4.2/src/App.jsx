import { useGlobalContext } from './context/GlobalContext';
import './App.css';

function App() {
  const { count, increment, decrement, reset } = useGlobalContext();

  return (
    <div className="app-container">
      <div className="counter-card">
        <h1>Global Counter</h1>
        <p className="subtitle">Counter value from Context API</p>
        <div className="counter-display">{count}</div>
        <div className="btn-group">
          <button className="btn" onClick={decrement}>
            Decrease
          </button>
          <button className="btn" onClick={increment}>
            Increase
          </button>
          <button className="btn btn-reset" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
