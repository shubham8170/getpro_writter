const mongoose = require('mongoose');
var validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        validate(mail) {
            if (!validator.isEmail(mail)) {
                throw new Error("Enter a valid email");
            }
        }
    },
    password: {
        type: String,
    },
    content_type: {
        type: String,
    },
    level: {
        type: String,
    }
});

const userSchema = new mongoose.model('userSchema', UserSchema);
module.exports = userSchema;