const API = "http://localhost:8080/api/holidays";

function getToken() {
  return localStorage.getItem('token');
}

export async function getHolidays() {
  const res = await fetch(`${API}`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to fetch holidays");
  return await res.json();
}

export async function createHoliday(name, date) {
  const res = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ name, date })
  });
  if (!res.ok) throw new Error("Create holiday failed");
  return await res.json();
}
