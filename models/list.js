const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    listing_id: {
        type: String,
        required: true,
        
    },
    listing_title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    postal_code: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0.0,
        validate: function(value){
        if(value < 0){
            throw new Error("Negative Salary not allowed")
        }
        } 
    },
    email: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        minlength: 5,
        maxlength: 50,
        validate: function(value){
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
        }
    },
    username: {
        type: String,
        //required: true,
    },
})

module.exports = mongoose.model('Listing', listingSchema)