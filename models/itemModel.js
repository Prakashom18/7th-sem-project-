const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    title : String,
    category : String,
    description : String
})

module.exports = mongoose.model('item',itemSchema);