const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamp");
let encrypt = require('../../helpers/encryption');
let users = new mongoose.Schema({
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid e-mail address"],
        lowercase: true,
        trim: true,
        unique: true,
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required'],
        unique: true,

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        set: encrypt.cryptPassword
    },
    first_name: {
        type: String,
        trim: true,
        required: [true, 'First name is required']
    },
    last_name: {
        type: String,
        trim: true,
        required: [true, 'Last name is required']
    },
    status: {
        type: String,
        enum: ['active', 'suspended'],
        default: "active"
    },
    favourite_cuisines: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cuisines'
        }],
        default: []
    },
    favourite_restaurants: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurants'
        }],
        default: []
    }
});
users.plugin(timestamps);
module.exports = mongoose.model('Users', users);