//1. Create a new User Profile (type = admin OR type = customer) (validate that All fields are mandatory)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profileSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: function(value){
            var passwordRegex = /^[\w#$&_]+$/;
            return passwordRegex.test(value);
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
    type: {
        type: String,
        required: true,
        enum: ['admin', 'customer'],
        lowercase:true
    }
})

module.exports = mongoose.model('Profile', profileSchema)