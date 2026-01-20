const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
    userId : mongoose.Schema.Types.ObjectId,
    itemId : mongoose.Schema.Types.ObjectId,
    rating : Number
})

module.exports = mongoose.model('rating', ratingSchema)