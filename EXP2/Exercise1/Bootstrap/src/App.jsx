import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <div className='form-control'>
        <h2>Enter Student Details</h2>
        <input
        type="text"
        placeholder="Enter Name"
      />
        <button>Submit</button>
      </div>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-outline-dark rounded-5">
          <input type="radio" name="options" id="option1" /> Day Scholar
        </label>
        <label class="btn btn-dark rounded-5">
          <input type="radio" name="options" id="option2" /> Hosteler
        </label>
      </div>
      <div class="btn-group container mt-4" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary rounded-5">AIML</button>
        <button type="button" class="btn btn-primary rounded-5">BIG DATA</button>
        <button type="button" class="btn btn-dark rounded-5">GEN CSE</button>
      </div>
      <div className="container-fluid mt-4">
            <h2 className="text-center">Bootstrap UI Demo</h2>
            <div className="card p-3 mt-3">
              <input className="form-control" placeholder="Enter name" />
            <button className="btn btn-primary mt-3">Submit</button>
            </div>
          </div>
    </>
  )
}

export default App
