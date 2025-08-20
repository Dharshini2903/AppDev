import React, { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import "../App.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then(setUsers);
  }, []);
  return (
    <div className="container">
      <div className="title">Users</div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.managerId || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
