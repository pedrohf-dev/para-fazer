const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);