import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../componets/Modal";

const API = import.meta.env.VITE_API_URL;

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    age: "",
    email: "",
    subject: "",
    secret: "",
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  async function fetchTeachers() {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/teacher`);
      setTeachers(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load teachers");
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setIsEdit(false);
    setForm({
      id: "",
      name: "",
      age: "",
      email: "",
      subject: "",
      secret: "",
    });
    setIsModalOpen(true);
  }

  function openEdit(teacher) {
    setIsEdit(true);
    setForm({ ...teacher });
    setIsModalOpen(true);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${API}/teacher/${form.id}`, form);
      } else {
        await axios.post(`${API}/teacher`, form);
      }
      setIsModalOpen(false);
      fetchTeachers();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this teacher?")) return;
    try {
      await axios.delete(`${API}/teacher/${id}`);
      fetchTeachers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  return (
    <div className="min-h-screenpy-6 px-4 sm:px-6 lg:px-8 md:ml-64">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 drop-shadow-sm">
            Teachers
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchTeachers}
              className="px-4 py-2 border-2 border-gray-300 rounded-xl bg-white/80 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Refresh
            </button>

            <button
              onClick={openAdd}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Add Teacher
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {loading ? (
            <div className="text-center py-12 text-gray-500 text-lg">
              Loading teachers...
            </div>
          ) : teachers.length === 0 ? (
            <div className="text-center py-12 text-gray-600 text-lg">
              No teachers found.
            </div>
          ) : (
            teachers.map((t, index) => (
              <div
                key={t.id}
                className={`bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 flex items-center justify-between hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 border border-gray-100`}
              >
                <div className="flex-1">
                  <div className="font-bold text-xl text-gray-800 mb-2">
                    {t.name}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>
                      ID: {t.id} · <span className="font-medium">Subject:</span>{" "}
                      <span className="bg-purple-100 px-2 py-1 rounded-full text-purple-800">
                        {t.subject}
                      </span>
                    </div>
                    <div>
                      Email:{" "}
                      <a
                        href={`mailto:${t.email}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {t.email}
                      </a>
                    </div>
                    <div>
                      Age: <span className="font-medium">{t.age}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-4">
                  <button
                    onClick={() => openEdit(t)}
                    className="px-4 py-2 rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          title={isEdit ? "Edit Teacher" : "Add Teacher"}
          onClose={() => setIsModalOpen(false)}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 bg-white shadow-inner disabled:bg-gray-100 disabled:cursor-not-allowed"
                type="number"
                name="id"
                placeholder="ID"
                value={form.id}
                onChange={handleChange}
                required
                disabled={isEdit}
              />
              <input
                className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 bg-white shadow-inner"
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 bg-white shadow-inner"
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
              />
              <input
                className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 bg-white shadow-inner"
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 bg-white shadow-inner"
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
              <input
                className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 bg-white shadow-inner"
                type="text"
                name="secret"
                placeholder="Secret Key"
                value={form.secret}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 rounded-xl border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold shadow-sm hover:shadow-md transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isEdit ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
