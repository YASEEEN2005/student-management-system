const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    age: Number,
    email: { type: String, required: true },
    subject: { type: String, required: true },
    secret: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const teacherData = mongoose.model("Teacher", teacherSchema);

module.exports = teacherData;