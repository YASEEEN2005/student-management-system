const teacherData = require("../Models/teacherModel");

const getTeachers = async (req, res) => {
  try {
    const teachers = await teacherData.find();
    res.send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getSingleTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await teacherData.findOne({ id: id });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.send(teacher);
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
      id,
      name,
      age,
      email,
      subject,
    });

    await data.save();
    res.send("Teacher Added");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, age, email, subject } = req.body;

  try {
    const teacher = await teacherData.findOneAndUpdate(
      { id: id },
      { name, age, email, subject },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({
      message: "Teacher updated successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await teacherData.findOneAndDelete({ id: id });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getTeachers,
  getSingleTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
