const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 5,
        maxLength : 25
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
        minLength : 6,
    },
    firstName : {
        type : String,
        requried : true,
        trim : true,
        maxLength:40
    },
    lastName : {
        type: String,
        required : true,
        trim : true,
        maxLength : 40
    }
})

module.exports = {userSchema}