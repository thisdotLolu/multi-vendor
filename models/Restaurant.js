const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    title:{type: String, required: true},
    time:{ type: String, required: true},
    imageUrl: {type: String, required: true},
    foods: {type: Array},
    pickup: {type:Boolean, required:false, default: true},
    delivery:{type: Boolean, required: false, default: true},
    owner: {type: String, required: true},
    isAvailable: {type: Boolean, required: false, default:true},
    code:{type: String, required: true},
    logoUrl:{
        type: String,
        required: true,
        default:'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'
    },
    rating: {type: Number, min: 1, max: 5},
    ratingCount: {type: String},
    coords: {
        id: {type: String, required: true},
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true, default: 0.0122},
        latitudeDelta:{type: Number, required: true, default:0.0221},
        address: {type: String, required: true},
        title: {type: String, required: true},
    }
}, {timestamps: true});

module.exports = restaurantSchema