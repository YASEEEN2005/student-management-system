import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./componets/Sidebar";
import Topbar from "./componets/Topbar";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";


function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
  
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Navigate to="/admin/students" replace />} />
    <Route path="students" element={<Students />} />
    <Route path="teachers" element={<Teachers />} />
  </Route>
  <Route path="/teacher" element={<TeacherDashboard />} />
  <Route path="/login" element={<Login />} />
  <Route path="/" element={<Login />} />


      <Route path="*" element={<div className="p-6">Page not found</div>} />
    </Routes>
  );
}
