const express = require("express")
const router = express.Router()
const userRouter = require('./user')

// all the user related routes are located in the userRouter
router.use("/user",userRouter)
router.use("/")

module.exports = router;