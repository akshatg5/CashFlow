// db.js connects the server to the mongoDB database
require('dotenv').config();
let express = require('express')
const mongoose = require('mongoose')
const {userSchema} = require('./Schemas/userSchema')

// connection to the MongoDB database
mongoose.connect(process.env.MONGODB_URI)


const User = mongoose.model("User",userSchema);

module.exports = {
    User
}


