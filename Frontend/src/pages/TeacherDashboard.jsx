import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TeacherDashboard() {
  const api = import.meta.env.VITE_API_URL;

  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);
  const [attendance, setAttendance] = useState("");

  async function loadStudents() {
    try {
      const res = await axios.get(`${api}/student`);
      setStudents(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    const s = search.toLowerCase();

    const result = students.filter(
      (stu) =>
        stu.name.toLowerCase().includes(s) ||
        stu.email.toLowerCase().includes(s) ||
        stu.cls.toLowerCase().includes(s) ||
        String(stu.id).includes(s)
    );

    setFiltered(result);
  }, [search, students]);

  async function updateAttendance(id) {
    try {
      await axios.put(`${api}/student/${id}`, { attendance });
      alert("Attendance updated");
      setEditId(null);
      loadStudents();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 drop-shadow-sm">
            Teacher Dashboard
          </h1>
          <Link
            to="/login"
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Log Out
          </Link>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search by name, email, class, or ID"
            className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          {filtered.map((stu, index) => (
            <div
              key={stu.id}
              className={`p-6 sm:p-8 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <p className="text-sm sm:text-base">
                  <strong className="text-gray-700">ID:</strong>{" "}
                  <span className="text-gray-900 font-medium">{stu.id}</span>
                </p>
                <p className="text-sm sm:text-base">
                  <strong className="text-gray-700">Name:</strong>{" "}
                  <span className="text-gray-900 font-medium">{stu.name}</span>
                </p>
                <p className="text-sm sm:text-base">
                  <strong className="text-gray-700">Age:</strong>{" "}
                  <span className="text-gray-900 font-medium">{stu.age}</span>
                </p>
                <p className="text-sm sm:text-base">
                  <strong className="text-gray-700">Email:</strong>{" "}
                  <span className="text-blue-600 hover:text-blue-800 transition-colors">
                    {stu.email}
                  </span>
                </p>
                <p className="text-sm sm:text-base">
                  <strong className="text-gray-700">Class:</strong>{" "}
                  <span className="text-gray-900 font-semibold bg-blue-100 px-2 py-1 rounded-full inline-block">
                    {stu.cls}
                  </span>
                </p>
                <p className="text-sm sm:text-base col-span-2 sm:col-span-1">
                  <strong className="text-gray-700">Attendance:</strong>{" "}
                  <span
                    className={`text-lg font-bold ${
                      stu.attendance >= 80
                        ? "text-green-600"
                        : stu.attendance >= 50
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {stu.attendance}%
                  </span>
                </p>
              </div>

              {editId === stu.id ? (
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <input
                    type="number"
                    className="border-2 border-gray-300 p-3 rounded-lg w-full sm:w-32 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 bg-white shadow-inner"
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    placeholder="Attendance"
                  />
                  <button
                    onClick={() => updateAttendance(stu.id)}
                    className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditId(stu.id);
                    setAttendance(stu.attendance);
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Edit Attendance
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
