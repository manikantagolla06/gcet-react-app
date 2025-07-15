import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const { users, setUsers } = useContext(AppContext);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const validateEmail = (email) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleSubmit = async () => {
    setError("");
    if (!user.name || !user.email || !user.pass) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(user.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (user.pass.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      const url = `${API}/users/register`;
      await axios.post(url, user);
      Navigate("/login");
    } catch (err) {
      setError("Registration failed. Try a different email.");
      console.log(err);
    }
  };
  return (
    <div className="login-page-center">
      <div className="login-container">
        <h3>Register</h3>
        <p>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Email address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setUser({ ...user, pass: e.target.value })}
          />
        </p>
        {error && <div className="message">{error}</div>}
        <button onClick={handleSubmit}>Submit</button>
        <hr />
        {users &&
          users.map((value, idx) => (
            <li key={idx}>
              {value.name}-{value.email}-{value.pass}
            </li>
          ))}
      </div>
    </div>
  );
}