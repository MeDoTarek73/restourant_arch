const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamp");
let cuisines = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Cuisine name is required']
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
    },
    currency: {
        type: String,
    },
    restaurants: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cuisines'
        }],
        default: []
    }
});
cuisines.plugin(timestamps);
module.exports = mongoose.model('Cuisines', cuisines);