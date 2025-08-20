// // src/App.js
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// // import ProtectedRoute from "./components/ProtectedRoute";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Attendance from "./pages/Attendance";
// import Corrections from "./pages/Corrections";
// import Holidays from "./pages/Holidays";
// import Users from "./pages/Users";
// import "./App.css";

// function App() {
//   const loggedIn = Boolean(localStorage.getItem("token"));
//   const role = localStorage.getItem("role");

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   return (
//     <BrowserRouter>
//       <Navbar loggedIn={loggedIn} role={role} onLogout={handleLogout} />
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route element={<ProtectedRoute />}>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/attendance" element={<Attendance />} />
//           <Route path="/corrections" element={<Corrections />} />
//           <Route path="/holidays" element={<Holidays />} />
//           <Route path="/users" element={<Users />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Attendance from "./pages/Attendance";
import Corrections from "./pages/Corrections";
import Holidays from "./pages/Holidays";
import Users from "./pages/Users";
import "./App.css";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import HomePage from "./components/AttendanceHomePage";

function getDashboardComponent() {
  const role = localStorage.getItem("role")?.toUpperCase();
  const email = localStorage.getItem("email");
  const user = { email, role };

  if (role === "EMPLOYEE") return <EmployeeDashboard user={user} />;
  if (role === "MANAGER") return <ManagerDashboard user={user} />;
  if (role === "ADMIN") return <AdminDashboard user={user} />;
  return <Navigate to="/login" />;
}
// const [show, setShow] = useState(false);
// <button onClick={() => setShow(!show)}>click</button>
// {show && <p></p>}
function App() {
  const loggedIn = Boolean(localStorage.getItem("token"));
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn} role={role} onLogout={handleLogout} />
      <Routes>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route
          path="/attendance"
          element={loggedIn ? <Attendance /> : <Login />}
        />
        <Route
          path="/corrections"
          element={loggedIn ? <Corrections /> : <Login />}
        />
        <Route
          path="/holidays"
          element={loggedIn ? <Holidays /> : <Login />}
        /> */}
        <Route path="/users" element={role === "ADMIN" ? <Users /> : <Login />} />

        <Route
          path="/dashboard"
          element={loggedIn ? getDashboardComponent() : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to={loggedIn ? "/dashboard" : "/login"} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
