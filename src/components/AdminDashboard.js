// src/components/AdminDashboard.js
import React from "react";
import "./AdminDashboard.css";

export default function AdminDashboard({ user }) {
  // Sample static data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Employee" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Manager" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Employee" },
  ];

  const attendanceSummary = {
    totalEmployees: 20,
    presentToday: 15,
    absentToday: 5,
  };

  const leaveRequests = [
    { id: 1, employee: "John Doe", type: "Sick Leave", status: "Pending" },
    { id: 2, employee: "Jane Smith", type: "Casual Leave", status: "Approved" },
  ];

  return (
    <div className="admin-dashboard">
      <h2>Welcome, {user.email} (Admin)</h2>

      <section className="summary">
        <h3>Attendance Summary</h3>
        <ul>
          <li>Total Employees: {attendanceSummary.totalEmployees}</li>
          <li>Present Today: {attendanceSummary.presentToday}</li>
          <li>Absent Today: {attendanceSummary.absentToday}</li>
        </ul>
      </section>

      <section className="users">
        <h3>User Management</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="leave-requests">
        <h3>Leave Requests</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.employee}</td>
                <td>{r.type}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
