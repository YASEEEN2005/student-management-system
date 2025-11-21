const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    id : {type:Number,required : true , unique:true},
    name: { type: String, required: true },
    age: Number,
    email: { type: String, required: true },
    cls: String,
    attendance : Number,
  },
  {
    timestamps: true,
  }
);

const studentData = mongoose.model("Students", studentSchema);

module.exports = { studentData };