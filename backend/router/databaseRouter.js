const express = require('express')
const { getConnectionStatus } = require('../controller/mongoContorler')
 
  

const Router = express.Router()

Router.route("/getConnectionStatus").get( getConnectionStatus) 
 
   

module.exports =Router