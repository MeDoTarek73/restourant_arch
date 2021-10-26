const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamp");
let restaurants = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Restaurant name is required']
    },
    unique_name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Restaurant unique name is required']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
    cuisines: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cuisines'
        }],
        default: []
    },
});
restaurants.plugin(timestamps);
module.exports = mongoose.model('Restaurants', restaurants);