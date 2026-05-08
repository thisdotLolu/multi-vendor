const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    driver: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    vehicleType: {type:String, required:true, enum: ['Bike', 'Scooter' , 'Car']},
    vehicleNumber: {type:String, required: true},
    currentLocation: {latitude: {type:Number, required: true},longitude: {type:Number, required: true}, latitudeDelta:{type:Number, required: true, default: 0.0122}, longitudeDelta: {type:Number, required: true, default: 0.0221}},
    isAvailable: {type: Boolean, required: true},
    rating: {type: Number, required: true},
    totalDeliveries:{type:Number, default:0},
    profileImage:{type:String, default:'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='}
}, {timestamps: true})

module.exports = mongoose.model('Driver', driverSchema);