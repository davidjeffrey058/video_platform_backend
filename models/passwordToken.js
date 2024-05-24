const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const passSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
        ref: 'users'
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

module.exports = mongoose.model('PassToken', passSchema);