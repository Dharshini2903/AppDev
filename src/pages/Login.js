// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../api/auth";
// import "../App.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [alert, setAlert] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await loginUser(email, password);
//       localStorage.setItem("token", res.token);
//       localStorage.setItem("role", res.role);
//       setAlert("");
//       navigate("/");
//     } catch (err) {
//       setAlert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="title">Login</div>
//       {alert && <div className="alert">{alert}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("email", res.email);
      localStorage.setItem("name", res.name);
      setAlert("");
      navigate("/dashboard"); 
    } catch (err) {
      setAlert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="title">Login</div>
      {alert && <div className="alert">{alert}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
