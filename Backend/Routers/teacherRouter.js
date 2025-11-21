const {
  getTeachers,
  getSingleTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

const throuter = require("express").Router();

throuter.get("/", getTeachers);
throuter.get("/:id", getSingleTeacher);
throuter.post("/", createTeacher);
throuter.put("/:id", updateTeacher);
throuter.delete("/:id", deleteTeacher);

module.exports = throuter;
