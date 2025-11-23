import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  const admin = {
    id: "admin",
    secret: "admin@123",
  };

  const [login, setLogin] = useState({ id: "", secret: "" });

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();

    if (login.id === admin.id && login.secret === admin.secret) {
      return navigate("/admin/students");
    }

    try {
      const res = await axios.get(`${api}/teacher/${login.id}`);

      if (!res.data) {
        return alert("Invalid Teacher ID");
      }

      const teacher = res.data;

      if (teacher.secret !== login.secret) {
        return alert("Invalid Secret Key");
      }
      navigate("/teacher");
    } catch (err) {
      console.log(err);
      alert("Teacher not found");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur-sm shadow-2xl p-8 rounded-2xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
          Login
        </h2>

        <input
          type="text"
          name="id"
          placeholder="Enter ID"
          value={login.id}
          onChange={handleChange}
          className="w-full mb-4 p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 bg-white shadow-inner"
          required
        />

        <input
          type="password"
          name="secret"
          placeholder="Enter Secret Key"
          value={login.secret}
          onChange={handleChange}
          className="w-full mb-6 p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 bg-white shadow-inner"
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
