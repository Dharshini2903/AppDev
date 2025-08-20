import React, { useEffect, useState } from "react";
import { checkIn, checkOut, getAttendanceLogs } from "../api/attendance";
import "../App.css";

export default function Attendance() {
  const [logs, setLogs] = useState([]);
  const [alert, setAlert] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getAttendanceLogs(userId).then(setLogs);
  }, [userId]);

  const handleCheckIn = async () => {
    try {
      await checkIn(userId);
      setAlert("Checked in successfully.");
      getAttendanceLogs(userId).then(setLogs);
    } catch {
      setAlert("Error while checking in.");
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOut(userId);
      setAlert("Checked out successfully.");
      getAttendanceLogs(userId).then(setLogs);
    } catch {
      setAlert("Error while checking out.");
    }
  };

  return (
    <div className="container">
      <div className="title">Attendance Logs</div>
      {alert && <div className="success">{alert}</div>}
      <button onClick={handleCheckIn}>Check In</button>
      <button onClick={handleCheckOut}>Check Out</button>
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
              <td>{log.checkInTime ? log.checkInTime.split("T")[1].slice(0,8) : ""}</td>
              <td>{log.checkOutTime ? log.checkOutTime.split("T")[1].slice(0,8) : ""}</td>
              <td>{log.totalHours || "-"}</td>
              <td>{log.isCorrected ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
