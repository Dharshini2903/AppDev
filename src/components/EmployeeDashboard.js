import React, { useEffect, useState } from "react";
import { checkIn, checkOut, getAttendanceLogs } from "../api/attendance";
import "./EmployeeDashboard.css";

export default function AttendanceControl() {
  const [employeeId, setEmployeeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState([]);

  // Fetch employee details when component mounts
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/auth/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }); 
        if (!res.ok) throw new Error("Failed to fetch employee details");

        const data = await res.json();
        setEmployeeId(data.id);  // store employeeId in state
      } catch (err) {
        console.error("Error fetching employee:", err);
        setMessage("Unable to load employee details");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);
  useEffect(() => {
  if (!employeeId) return;

  const fetchLogs = async () => {
    try {
      const attendance = await getAttendanceLogs(employeeId);
      setLogs(attendance);
    } catch (err) {
      console.error("Failed to fetch attendance logs:", err);
    }
  };

  fetchLogs();
}, [employeeId]);

  const handleCheckIn = async () => {
    if (!employeeId) {
      setMessage("Employee ID not loaded yet!");
      return;
    }
    try {
      await checkIn(employeeId);  // pass id in API
      setMessage("Checked in successfully!");
    } catch (err) {
      console.error("Check-in failed:", err);
      setMessage("Check-in failed.");
    }
  };

  const handleCheckOut = async () => {
    if (!employeeId) {
      setMessage("Employee ID not loaded yet!");
      return;
    }
    try {
      await checkOut(employeeId);  // pass id in API
      setMessage("Checked out successfully!");
    } catch (err) {
      console.error("Check-out failed:", err);
      setMessage("Check-out failed.");
    }
  };

  if (loading) return <p>Loading employee...</p>;

  return (
    <div className="attendance-control">
      <h2>Attendance Control</h2>
      <p>Employee ID: {employeeId}</p>
      <button onClick={handleCheckIn}>Check In</button>
      <button onClick={handleCheckOut}>Check Out</button>
      <p>{message}</p>
      <table className="table">
  <thead>
    <tr>
      <th>Date</th>
      <th>Check In</th>
      <th>Check Out</th>
      <th>Total Hours</th>
      <th>Corrected?</th>
    </tr>
  </thead>
  <tbody>
    {logs.map((log) => (
      <tr key={log.id}>
        <td>{log.checkInTime ? log.checkInTime.split("T")[0] : ""}</td>
        <td>{log.checkInTime ? log.checkInTime.split("T")[1].slice(0, 8) : ""}</td>
        <td>{log.checkOutTime ? log.checkOutTime.split("T")[1].slice(0, 8) : ""}</td>
        <td>{log.totalHours || "-"}</td>
        <td>{log.isCorrected ? "Yes" : "No"}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}
