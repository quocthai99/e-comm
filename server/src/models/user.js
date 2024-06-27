const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    },
    access_token: {
        type:String,
        require: true
    },
    refresh_token: {
        type:String,
        require: true
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('User', userSchema);