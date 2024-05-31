const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
    },
    bannerImage:{
        type:String,
    }
})

const Admin = mongoose.model('admins',adminSchema)
module.exports = Admin