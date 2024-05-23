const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'user',
        unique: true,
    },
    token: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now(),
        expires: 3600
    },
})

module.exports = mongoose.model('Token', tokenSchema);