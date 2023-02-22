const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  personalInfo: {
    fistName: {
      type: String,
      required: [true, "Please enter you fist name"],
    },
    middleName: {
      type: String,
      required: [true, "Please enter you middle name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter you last name"],
    },
    age: {
      type: Number,
      require: true,
      minLength: [2, "Incurrect Age"],
      maxLength: [3, "Incurrect Age"],
    },
    gender: {
      type: String,
      required: [true, "Please enter your gender"],
    },
    DOB: {
      type: String,
      required: [true, "Please enter the date of birth"],
    },
  },
  department: {
    type: String,
    required: [true, "Please enter your department"],
  },
  year: {
    type: String,
    required: [true, "Please enter year of Study"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: [true, "Please enter you Email"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter your phone number"],
  },
  enNumber: {
    type: String,
    required: [true, "Please enter college name"],
  },
  rollNumber: {
    type: Number,
    required: [true, "Please enter your roll number"],
  },
  div: {
    type: String,
    required: [true, "Please enter your divison"],
  },
  role: {
    type: String,
    default: "student",
  },
  clgShortName: {
    type: String,
    required:[true,"please enter the college name"]
  },
  status:{
    type:String,
    default:"unBan"
  },
  course:{
    type:String,
    required:[true,"please select the course"]
  }
});

module.exports = mongoose.model("student", studentSchema);
