const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const { findById } = require("../model/facultyIdModel");
const facultyIdModel = require("../model/facultyIdModel");
const facultyModel = require("../model/facultyModel");
const userModel = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendJwt = require("../utils/sendJwt");


// signUp
exports.signUp = catchAsyncErorr(async (req, res, next) => {
 
  let a = req.body 
  delete a.OTP
console.log(a);
  // problem here
  const facultyID = await facultyIdModel.findOne({ ID: req.body.facultyID });
  console.log(facultyID);
  if (!facultyID) {
    return next(new ErrorHandler("Invailed faculty ID", 404));
  } else {
    if (req.body.facultyID !== "0000") {
      req.body.role = "teacher";
      await facultyIdModel.findByIdAndDelete(facultyID._id);
    }

    const newAcc = await userModel.create(a);
    sendJwt(newAcc, res, "Account is crated successfully", 201, req);
  } 
});
 
// loged in
exports.login = catchAsyncErorr(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorHandler("Please enter your email or password of faculty ID", 400)
    );
  } 
  const user = await userModel.findOne({ email }).select("+password"); 
  if (!user) {
    return next(new ErrorHandler("User does not exist", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Wrong Password", 200));
  }
  sendJwt(user, res, "LogeIn Successfully", 200, req);
});
 
// log out
exports.logOut = catchAsyncErorr((req, res, next) => {
  res
    .clearCookie("token", {
      expire: new Date(Date.now() - 1000),
      httpOnly: true,
    })
    .json({
      msg: "logout successfully",
      logOut:true
    });
});

// get all user
exports.getAllUser = catchAsyncErorr(async (req, res, next) => {
  const getAllUser = await userModel.find({});

  res.status(201).json({
    status: "all user list",
    getAllUser,
  });
});

// update user password
exports.updatePassword = catchAsyncErorr(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Wrong Password", 404));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler(" Password does not match ", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  res.status(201).json({
    status: "all user list",
    user,
  });
});

// get user detail
exports.getUserDetails = catchAsyncErorr(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});


//update user 
exports.updateUser = catchAsyncErorr(async (req, res, next) => {
  const user = await userModel.findOneAndUpdate({email:req.body.email},req.body); 
  
  res.status(200).json({
    success: true,
    user,
  });
});

//update user 
exports.changeTheme = catchAsyncErorr(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.params.id,{ settings:{theme:req.params.theme}}); 
  
  res.status(200).json({
    success: true,
    user,
  });
});


// does user exist or not
exports.isExist = catchAsyncErorr(async (req, res, next) => {
  if (!req.params.email ) {
    return next(
      new ErrorHandler("Please enter email", 400)
      );
    } 
   const user = await userModel.findOne({ email:req.params.email })
  if (!user) {
    console.log(user);
    return next(new ErrorHandler("User does not exist", 404));
  } 
 
  res.status(200).json({
    success: true,
     username:user.username
  });
});


// log in with out pass
// loged in
exports.login_withoutPass = catchAsyncErorr(async (req, res, next) => {
  console.log(req.params);
  const { email ,sendedOTP,recivedOTP} = req.params;
  const user = await userModel.findOne({ email }).select("+password");  
 if (sendedOTP!=recivedOTP) {
  return next(new ErrorHandler("somthing went wrong123",500))
 }
  sendJwt(user, res, "LogeIn Successfully", 200, req);
});