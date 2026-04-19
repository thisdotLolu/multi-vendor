const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required:true},
    email: {type: String, required: true, unique: true},
    uid: {type: String, required: true, unique: true},
    password:{type: String, required: true},
    address:{type:Array, required:false},
    phone:{type:String, required: false},
    userType: {type: String, required: true, default:"Client", enum:['Admin', 'Driver', 'Client', 'Vendor']},
    profile:{
        type:String,
        required:true,
        default:"https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
    }
}, {timestamps: true});


module.exports = mongoose.model("User", UserSchema)