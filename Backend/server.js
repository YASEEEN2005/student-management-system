const { config } = require("dotenv");
const express = require("express");
const connectDb = require("./config/db");
const studentRouter = require("./Routers/studentRoute");
const teacherRouter = require("./Routers/teacherRouter");
const bodyparse = require("body-parser");
const app = express();
require("dotenv").config();
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

connectDb();
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
