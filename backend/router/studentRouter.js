const express = require('express')
const { createAcc, getAllStudent, getStudentDetail, findStudentByIdAndUpdateRole } = require('../controller/studentContoller')
const { isAuthenticated, authorizedRole } = require('../middleware/auth')

const Router = express.Router()

Router.route("/addstudent").post(isAuthenticated,createAcc) 
Router.route("/getstudents/:course/:clgShortName/:department/:year/:div").get(isAuthenticated,authorizedRole("HOD","teacher"),getAllStudent)
Router.route("/user/detail/:email").get(isAuthenticated,getStudentDetail)
Router.route("/user/student/update/role/:id/:role").put(isAuthenticated,findStudentByIdAndUpdateRole)


module.exports =Router    