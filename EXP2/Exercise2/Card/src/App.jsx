import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mt-5 ">
      <div className="row g-4">
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card 1</h5>
              <p className="card-text">
                AI ML.
              </p>
              <button className="btn btn-outline-dark">View</button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card 2</h5>
              <p className="card-text">
                DSA
              </p>
              <button className="btn btn-outline-dark">View</button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card 3</h5>
              <p className="card-text">
                Game Dev
              </p>
              <button className="btn btn-outline-dark">View</button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card 4 </h5>
              <p className="card-text">
                VFX
              </p>
              <button className="btn btn-outline-dark">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
