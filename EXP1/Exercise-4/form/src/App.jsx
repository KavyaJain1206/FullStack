import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page reload
    setSubmittedData({ name, email });
  };

  return (
    <div className="container">
      <h2>Simple Form SPA</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="result">
          <h3>Submitted Data</h3>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;
