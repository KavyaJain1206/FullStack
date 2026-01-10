import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className='table'>
      <h2>To-Do List</h2>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter task name"
      />
      <button onClick={addTask}>Add</button>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
