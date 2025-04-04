const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortid: { type: String, required: true, unique: true },
    redirectURL: { type: String, required: true }
}, { timestamps: true });

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
