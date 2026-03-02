import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [passwordErrors, setPasswordErrors] = useState([]);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validatePassword = (password) => {
    const errors = [];

    if (!/^[A-Z]/.test(password)) {
      errors.push("Must start with Capital Letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Must contain at least one Number");
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Must contain one Special Character");
    }

    if (password.length < 5) {
      errors.push("Minimum 5 characters required");
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Live password validation
    if (name === "password") {
      setPasswordErrors(validatePassword(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|[a-z]{2,})$/;

    if (!emailRegex.test(formData.email)) {
      alert("Invalid Email format!");
      return;
    }

    if (passwordErrors.length > 0) {
      return; // Do nothing if password invalid
    }

    // Login successful
    setLoginSuccess(true);
  };

  if (loginSuccess) {
    return (
      <div className="container">
        <div className="login-card success-card">
          <div className="success-message">
            <h2>✅ Login Successful!</h2>
            <p>Welcome back! Your login was successful.</p>
            <p className="email-display">Email: {formData.email}</p>
            <button 
              className="login-btn" 
              onClick={() => {
                setLoginSuccess(false);
                setFormData({ email: "", password: "" });
              }}
            >
              Login Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="login-card">
        <h2>Corporate Login</h2>
        <p className="subtitle">Access your professional dashboard</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="example@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter secure password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Live Password Rules */}
            <div className="password-rules">
              {passwordErrors.map((error, index) => (
                <p key={index} className="error-text">
                  ❌ {error}
                </p>
              ))}
            </div>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="footer-text">
          © 2026 Corporate Systems Pvt. Ltd.
        </div>
      </div>
    </div>
  );
}

export default App;