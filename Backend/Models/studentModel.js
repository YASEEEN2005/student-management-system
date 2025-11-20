const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: Number,
    email: { type: String, required: true },
    course: String,
  },
  {
    timestamps: true,
  }
);

const studentData = mongoose.model("Students", studentSchema);

module.exports = { studentData };
