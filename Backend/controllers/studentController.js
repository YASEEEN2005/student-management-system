const { studentData } = require("../Models/studentModel");

const getStudent = async (req, res) => {
  const student = await studentData.find();
  res.send(student);
};

const createStudent = async (req, res) => {
  const { name, age, email, course } = req.body;
  if (!name || !age || !email || !course) {
    return res.status(400).json({
      message: "All fields (name, age, email, course) are required",
    });
  }
  try {
    const data = new studentData({
      name: name,
      email: email,
      age: age,
      course: course,
    });
    await data.save();
    res.send("Student Added");
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getStudent, createStudent };
