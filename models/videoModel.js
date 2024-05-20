const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('Videos', VideoSchema);