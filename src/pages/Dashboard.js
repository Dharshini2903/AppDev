// import React from "react";
// import "../App.css";

// export default function Dashboard() {
//   const userRole = localStorage.getItem("role");
//   return (
//     <div className="container">
//       <div className="title">Welcome to Employee Portal</div>
//       <p>Role: <strong>{userRole}</strong></p>
//       <p>Use the navigation above to access features!</p>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";

// ✅ Admin Dashboard
function AdminDashboard({ user, onLogout }) {
  const [stats] = useState({
    totalUsers: 1250,
    totalTeachers: 45,
    totalStudents: 1205,
    totalCourses: 28,
    activeUsers: 892,
  });

  const [recentActivities] = useState([
    { id: 1, action: "New user registration", user: "Alice Johnson", time: "2 hours ago" },
    { id: 2, action: "Course created", user: "Prof. Smith", time: "4 hours ago" },
    { id: 3, action: "System backup completed", user: "System", time: "6 hours ago" },
    { id: 4, action: "New teacher onboarded", user: "Dr. Wilson", time: "1 day ago" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user.name}</span>
              <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded-md">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard label="Total Users" value={stats.totalUsers} color="blue" />
          <StatCard label="Teachers" value={stats.totalTeachers} color="green" />
          <StatCard label="Students" value={stats.totalStudents} color="purple" />
          <StatCard label="Courses" value={stats.totalCourses} color="yellow" />
          <StatCard label="Active Users" value={stats.activeUsers} color="red" />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
          {recentActivities.map((act) => (
            <div key={act.id} className="flex justify-between border-b py-2 text-sm text-gray-700">
              <span>{act.action} — {act.user}</span>
              <span className="text-gray-400">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Small reusable Stat card
function StatCard({ label, value, color }) {
  const colorMap = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 flex items-center">
      <div className={`w-8 h-8 ${colorMap[color]} rounded-full flex items-center justify-center text-white font-bold`}>
        {label[0]}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

// ✅ Teacher Dashboard
function TeacherDashboard({ user, onLogout }) {
  const [courses] = useState([
    { id: 1, name: "Advanced Mathematics", students: 32, assignments: 8, grade: "A+" },
    { id: 2, name: "Physics 101", students: 28, assignments: 6, grade: "A" },
    { id: 3, name: "Chemistry Basics", students: 25, assignments: 5, grade: "B+" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-semibold mb-4">Teacher Dashboard</h1>
      <button onClick={onLogout} className="mb-4 bg-red-600 text-white px-4 py-2 rounded-md">
        Logout
      </button>

      <div className="grid gap-4">
        {courses.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold">{c.name}</h4>
            <p>{c.students} students • {c.assignments} assignments</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ Student Dashboard
function StudentDashboard({ user, onLogout }) {
  const [courses] = useState([
    { id: 1, name: "Advanced Mathematics", teacher: "Prof. Johnson", progress: 75 },
    { id: 2, name: "Physics 101", teacher: "Dr. Smith", progress: 82 },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-semibold mb-4">Student Dashboard</h1>
      <button onClick={onLogout} className="mb-4 bg-red-600 text-white px-4 py-2 rounded-md">
        Logout
      </button>

      {courses.map((c) => (
        <div key={c.id} className="bg-white p-4 rounded shadow mb-2">
          <h4 className="font-semibold">{c.name}</h4>
          <p className="text-gray-600">By {c.teacher}</p>
          <p>Progress: {c.progress}%</p>
        </div>
      ))}
    </div>
  );
}

// ✅ Main Dashboard Router Component
export default function Dashboard() {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const name = role === "admin" ? "Admin User"
            : role === "teacher" ? "John Smith"
            : "Jane Doe";

  const user = { name, email, role };
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login"; // redirect to login
  };

  switch (role) {
    case "admin":
      return <AdminDashboard user={user} onLogout={handleLogout} />;
    case "teacher":
      return <TeacherDashboard user={user} onLogout={handleLogout} />;
    case "student":
      return <StudentDashboard user={user} onLogout={handleLogout} />;
    default:
      return <p>No role found. Please login again.</p>;
  }
}
