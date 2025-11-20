const {
  getTeachers,
  createTeacher,
} = require("../controllers/teacherController");

const throuter = require("express").Router();

throuter.get("/", getTeachers);
throuter.post("/", createTeacher);

module.exports = throuter;
