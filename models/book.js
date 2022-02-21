const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    listing_id: {
        type: String,
        required: true,   
    },
    booking_id: {
        type: String,
        required: true
    },
    booking_date: {
        type: Date,
        default: Date.now,
    },
    booking_start: {
        type: String,
        required: true
    },
    booking_end: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Booking', bookSchema)