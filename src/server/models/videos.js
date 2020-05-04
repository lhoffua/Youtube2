const mongoose = require('mongoose');
const User = require('../models/Users');

const VideoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    user:{
        type: User,
        required: true
    },
    
    location:{
        type: String,
        required: true
    },
    
    description:{
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const video = mongoose.model('video', VideoSchema);

module.exports = video;