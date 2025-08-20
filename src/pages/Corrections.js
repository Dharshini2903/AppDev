import React, { useState, useEffect } from "react";
import { getCorrections, createCorrection } from "../api/corrections";
import "../App.css";

export default function Corrections() {
  const [corrections, setCorrections] = useState([]);
  const [logId, setLogId] = useState("");
  const [reason, setReason] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    getCorrections().then(setCorrections);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createCorrection(logId, reason);
      setAlert("Correction submitted!");
      getCorrections().then(setCorrections);
    } catch {
      setAlert("Error submitting correction.");
    }
  };

  return (
    <div className="container">
      <div className="title">Corrections</div>
      {alert && <div className="success">{alert}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Attendance Log ID:</label>
          <input value={logId} onChange={e=>setLogId(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Reason:</label>
          <input value={reason} onChange={e=>setReason(e.target.value)} required />
        </div>
        <button type="submit">Submit Correction</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Log ID</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {corrections.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.attendanceLogId}</td>
              <td>{c.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
