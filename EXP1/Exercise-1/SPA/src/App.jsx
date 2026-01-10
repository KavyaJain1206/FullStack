import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState("")

  return (
    <>
      <div className="card">
        <h1>Counter</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          +
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          -
        </button>
        <h3>Count is {count}</h3>
      </div>
    </>
  )
}

export default App
