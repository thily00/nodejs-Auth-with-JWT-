const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    pseudo :{
        type: String,
        required : true,
        min:6,
        max:255
    },
    telephone:{
        type:String,
        required:true,
        min:6,
        max:20
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    Date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User',userSchema)