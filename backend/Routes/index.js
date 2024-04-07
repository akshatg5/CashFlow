const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const accountRouter = require("./account");

// all the user related routes are located in the userRouter
router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
