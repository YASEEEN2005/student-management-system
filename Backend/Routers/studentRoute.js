const {
  getStudent,
  createStudent,
} = require("../controllers/studentController");

const sdrouter = require("express").Router();

sdrouter.get("/", getStudent);
sdrouter.post("/", createStudent);

module.exports = sdrouter;
