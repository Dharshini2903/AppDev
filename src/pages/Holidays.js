import React, { useState, useEffect } from "react";
import { getHolidays, createHoliday } from "../api/holidays";
import "../App.css";

export default function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    getHolidays().then(setHolidays);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createHoliday(name, date);
      setAlert("Holiday created!");
      getHolidays().then(setHolidays);
    } catch {
      setAlert("Error creating holiday.");
    }
  };

  return (
    <div className="container">
      <div className="title">Holidays</div>
      {alert && <div className="success">{alert}</div>}
      {role === "ADMIN" && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} required />
          </div>
          <button type="submit">Add Holiday</button>
        </form>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map(h => (
            <tr key={h.id}>
              <td>{h.name}</td>
              <td>{h.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
