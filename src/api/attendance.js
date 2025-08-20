// src/api/attendance.js
import { API_BASE_URL } from "./constants";


export async function checkIn(employeeId) {
  const res = await fetch(`${API_BASE_URL}/attendance/checkin/${employeeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,  // 🔑 Add this
    },
  });

  if (!res.ok) throw new Error("Check-in failed");
  return res.json();
}

export async function checkOut(employeeId) {
  const res = await fetch(`${API_BASE_URL}/attendance/checkout/${employeeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,  // 🔑 Add this
    },
  });

  if (!res.ok) throw new Error("Check-out failed");
  return res.json();
}

export async function getAttendanceLogs(employeeId) {
  const res = await fetch(`${API_BASE_URL}/attendance/user/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,  // 🔑 Add this
    },
  });

  if (!res.ok) throw new Error("Fetching attendance logs failed");
  return res.json();
}
