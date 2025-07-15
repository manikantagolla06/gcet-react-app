import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import axios from "axios";
export default function Login() {
  const { users, user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const handleSubmit = async () => {
    // const found = users.find(
    //   (value) => value.email === user.email && value.pass === user.pass
    // );
    const url = `${API}/users/login`;
    const found = await axios.post(url, user);
    console.log(found)

    if (found.data && found.data.message === "email_not_found") {
      setMsg("Email not found. Redirecting to register...");
      setTimeout(() => {
        Navigate("/register");
      }, 1200);
    } else if (found.data && found.data.message === "incorrect_password") {
      setMsg(<span style={{ color: 'crimson', fontWeight: 'bold' }}>Incorrect password</span>);
    } else if (found.data && found.data.email) {
      setUser(found.data);
      Navigate("/");
    }
  };

  const goToRegister = () => {
    Navigate("/register");
  };

  return (
    <div className="login-page-center">
      <div className="login-container">
        <h3>Login</h3>
        {msg && <div>{msg}</div>}
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
            placeholder="Password"
            onChange={(e) => setUser({ ...user, pass: e.target.value })}
          />
        </p>
        <button onClick={handleSubmit}>Submit</button>
        <p>
          <button className="create-account-btn" onClick={goToRegister}>Create Account</button>
        </p>
      </div>
    </div>
  );
}