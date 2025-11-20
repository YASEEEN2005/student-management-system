const teacherData = require("../Models/teacherModel");
const getTeachers = async (req, res) => {
  try {
    const teachers = await teacherData.find();
    res.send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createTeacher = async (req, res) => {
  const { id, name, age, email, subject } = req.body;

  if (!id || !name || !email || !subject) {
    return res.status(400).json({
      message: "All fields (id, name, email, subject) are required",
    });
  }

  try {
    const data = new teacherData({
      id: id,
      name: name,
      age: age,
      email: email,
      subject: subject,
    });

    await data.save();
    res.send("Teacher Added");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getTeachers, createTeacher };
