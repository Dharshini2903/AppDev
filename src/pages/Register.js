import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import "../App.css";

export default function Register() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await registerUser(name, email, password, role);
      setSuccess("Registered successfully! Please login.");
      setAlert("");
      setTimeout(() => navigate("/login"), 1400);
    } catch (err) {
      setAlert("Registration failed - try with another email.");
      setSuccess("");
    }
  };

  return (
    <div className="container">
      <div className="title">Register</div>
      {alert && <div className="alert">{alert}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select value={role} onChange={e=>setRole(e.target.value)}>
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
