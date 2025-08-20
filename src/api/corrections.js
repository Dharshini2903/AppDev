const API = "http://localhost:8080/api/corrections";

function getToken() {
  return localStorage.getItem('token');
}

export async function getCorrections() {
  const res = await fetch(`${API}`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to fetch corrections");
  return await res.json();
}

export async function createCorrection(attendanceLogId, reason) {
  const res = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ attendanceLogId, reason })
  });
  if (!res.ok) throw new Error("Create correction failed");
  return await res.json();
}
