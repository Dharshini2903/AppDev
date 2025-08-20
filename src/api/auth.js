// const API = "http://localhost:8080/api";

// function getToken() {
//   return localStorage.getItem("token");
// }

// export async function loginUser(email, password) {
//   const res = await fetch(`${API}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password })
//   });
//   if (!res.ok) throw new Error("Login failed");
//   return await res.json();
// }

// export async function getCurrentUser() {
//   const res = await fetch(`${API}/auth/me`, {
//     headers: { "Authorization": `Bearer ${getToken()}` }
//   });
//   if (!res.ok) throw new Error("Failed to fetch user");
//   return await res.json();
// }

const API = "http://localhost:8080/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function loginUser(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();

  // normalize backend response → {token, role, email}
  return {
    token: data.token,
    role: data.user?.role || data.role,
    email: data.user?.email || data.email,
    userId: data.user?.id || data.userId,
    name: data.user?.name || data.user
  };
}

export async function registerUser(name, email, password, role) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role })
  });

  const text = await res.text();
  console.log(res.status, text);  // log status + body
  if (!res.ok) throw new Error(`Registration failed: ${text}`);
  return JSON.parse(text);
}

export async function getCurrentUser() {
  const res = await fetch(`${API}/auth/me`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return await res.json();
}
