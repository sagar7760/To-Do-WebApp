const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Document expires after 1 hour (3600 seconds)
    }
});

// No need for additional index since expires already creates one
module.exports = mongoose.model('PendingUser', pendingUserSchema);
