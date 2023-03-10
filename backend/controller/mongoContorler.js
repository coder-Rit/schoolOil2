const mongoose = require("mongoose");
const catchAsyncErorr = require("../middleware/catchAsyncErorr");

exports.getConnectionStatus = catchAsyncErorr(async (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    res.status(201).json({
      status: true,
    });
  } else {
    res.status(201).json({
      status: false,
    });
  }
});
