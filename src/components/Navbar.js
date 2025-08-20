import React from "react";
import { Link } from "react-router-dom";

function Navbar({ loggedIn, onLogout, role }) {
  return (
    <nav className="navbar">
      <div>
        <Link to="/">Dashboard</Link>
        {loggedIn && (
          <>
            <Link to="/attendance">Attendance</Link>
            <Link to="/corrections">Corrections</Link>
            <Link to="/holidays">Holidays</Link>
            {(role === "ADMIN" || role === "MANAGER") && <Link to="/users">Users</Link>}
          </>
        )}
      </div>
      <div>
        {loggedIn ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
