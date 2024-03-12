const { default: mongoose } = require("mongoose");

// account schema wherein db will store the amount of balance a given user has

const accountSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId, // referencing the user model
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required :  true,
        default : 0
    }

})

module.exports = {
    accountSchema
}