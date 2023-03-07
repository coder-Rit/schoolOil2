const studentModel = require("../model/studentModel");
const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const ErrorHandler = require("../utils/errorHandler");
 
// creating a studen account
exports.createAcc = catchAsyncErorr(async (req, res, next) => {
  let user = await studentModel.findOne({ email: req.body.email });

  if (!user) {
    user = await studentModel.create(req.body);
  } else {
    user = await studentModel.findOneAndReplace(
      { email: req.body.email },
      req.body
    );
  }

  res.status(201).json({
    status: true,
     user,
  });
});

// get all studen account
exports.getAllStudent = catchAsyncErorr(async (req, res, next) => {
  const userList = await studentModel.find({
    course: req.params.course,
    clgShortName: req.params.clgShortName,
    department:req.params.department,
    year:req.params.year,
    div: req.params.div
  });

  res.status(201).json({
    status: true,
    userList,
  });
});

// get single studen detail
exports.getStudentDetail = catchAsyncErorr(async (req, res, next) => {
  const userDetail = await studentModel.findOne({ email: req.params.email });

  if (!userDetail) {
    return next(new ErrorHandler("please update the profile detail", 404));
  }

  res.status(201).json({
    status: true,
    userDetail,
  });
});



// find_student_by_id_and_update_role
exports.findStudentByIdAndUpdateRole = catchAsyncErorr(async (req, res, next) => {
  const userDetail = await studentModel.findByIdAndUpdate(req.params.id,{role:req.params.role });

  if (!userDetail) {
    return next(new ErrorHandler("cant find user to update", 404));
  }

  res.status(201).json({
    status: true,
    userDetail,
  });
});
