const express = require('express')
const error = require('./middleware/error')
const connectTODatabase = require('./config/dataBase')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
//const cors  = require("cors")
const app = express()
const fileUpload = require("express-fileupload")
const path = require("path");


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

// app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())


//connection to the data base 
connectTODatabase()


const facultyRouter = require('./router/facultyRouter')
const userRouter = require('./router/userRouter') 
const studentRouter = require('./router/studentRouter')
const lectuerRouter = require('./router/lectuerRouter')
const facultyID = require('./router/facultyIDRouter')
const registerClgRouter = require('./router/registerClgRouter')
const divisionRouter = require('./router/divisionRouter')
const timeTableRouter = require('./router/timeTableRouter')
const messageRouter = require('./router/messageRouter')
 



app.use("/api/v1", facultyRouter)
app.use("/api/v1", userRouter)
app.use("/api/v1",studentRouter ) 
app.use("/api/v1", lectuerRouter)
app.use("/api/v1", facultyID)
app.use("/api/v1",registerClgRouter )
app.use("/api/v1",divisionRouter)
app.use("/api/v1",timeTableRouter)
app.use("/api/v1",messageRouter)
 

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

 
 
 app.use(error)
module.exports = app
