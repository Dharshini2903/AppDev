// src/components/ManagerDashboard.js
import React from "react";
import "./ManagerDashboard.css";

export default function ManagerDashboard({ user }) {
  const teamMembers = [
    { id: 1, name: "John Doe", email: "john@example.com", attendance: "Present" },
    { id: 2, name: "Alice Brown", email: "alice@example.com", attendance: "Absent" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", attendance: "Present" },
  ];

  const pendingApprovals = [
    { id: 1, employee: "Alice Brown", type: "Leave Request", status: "Pending" },
    { id: 2, employee: "John Doe", type: "Correction Request", status: "Pending" },
  ];

  return (
    <div className="manager-dashboard">
      <h2>Welcome, {user.email} (Manager)</h2>

      <section className="team-attendance">
        <h3>Team Attendance</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map(member => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.attendance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="pending-approvals">
        <h3>Pending Approvals</h3>
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
            {pendingApprovals.map(req => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.employee}</td>
                <td>{req.type}</td>
                <td>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
