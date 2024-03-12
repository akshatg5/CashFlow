// db.js connects the server to the mongoDB database
require('dotenv').config();
let express = require('express')
const mongoose = require('mongoose')
const {userSchema} = require('./Schemas/userSchema');
const { accountSchema } = require('./Schemas/accountSchema');

// connection to the MongoDB database
mongoose.connect(process.env.MONGODB_URI)


const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account",accountSchema)

module.exports = {
    User,Account
}


