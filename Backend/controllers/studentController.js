const { studentData } = require("../Models/studentModel");

const getStudent = async (req, res) => {
  const student = await studentData.find();
  res.send(student);
};

const getSinleStudent = async (req, res) => {
  const { id } = req.params;
  const singleStudent = await studentData.findOne({ id: id });
  res.send(singleStudent);
};

const createStudent = async (req, res) => {
  const { id, name, age, email, cls, attendance } = req.body;

  if (!name || !age || !email || !cls) {
    return res.status(400).json({
      message: "All fields (id, name, age, email, class) are required",
    });
  }

  try {
    const data = new studentData({
      id: id,
      name: name,
      email: email,
      age: age,
      cls: cls,
      attendance: attendance,
    });

    await data.save();
    res.send("Student Added");
  } catch (error) {
    res.send(error);
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, age, email, cls, attendance } = req.body;

  try {
    const student = await studentData.findOneAndUpdate(
      { id: id },
      { name, age, email, cls, attendance },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await studentData.findOneAndDelete({ id: id });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getStudent,
  getSinleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
