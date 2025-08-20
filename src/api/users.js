const API = "http://localhost:8080/api/users";

function getToken() {
  return localStorage.getItem('token');
}

export async function getUsers() {
  const res = await fetch(`${API}`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
}
