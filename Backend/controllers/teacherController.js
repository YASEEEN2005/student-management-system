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
  const { id, name, age, email, subject, secret } = req.body;

  if (!id || !name || !email || !subject || !secret) {
    return res.status(400).json({
      message: "All fields (id, name, email, subject, secret) are required",
    });
  }

  try {
    const data = new teacherData({
      id,
      name,
      age,
      email,
      subject,
      secret,
    });

    await data.save();
    res.json({ message: "Teacher added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, age, email, subject, secret } = req.body;

  try {
    const teacher = await teacherData.findOneAndUpdate(
      { id: id },
      { name, age, email, subject, age, secret },
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
    res.status(500).json({ error: error.message });
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
