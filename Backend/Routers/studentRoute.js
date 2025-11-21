const {
  getStudent,
  getSinleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const sdrouter = require("express").Router();

sdrouter.get("/", getStudent);
sdrouter.get("/:id", getSinleStudent);
sdrouter.post("/", createStudent);
sdrouter.put("/:id", updateStudent);
sdrouter.delete("/:id", deleteStudent);

module.exports = sdrouter;
