const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    category: String,
    level: String
});

module.exports = mongoose.model('Course', courseSchema);
