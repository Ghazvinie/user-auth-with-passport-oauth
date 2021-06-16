const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Email required'],
        unique: [true, 'Email already used'],
        lowercase: true,
        validate: [isEmail, 'Invalid email']
    },

    password: {
        type: String,
        required: [true, 'Password required'],
        minLength: [6, 'Password must be at least 6 characters long'],
        maxLength: [25, 'Password length exceeded']
    },
    googleID: {
        type: String
    }
});

// Hashes password before saving
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    // Check password is being passed in, if user authenticates with Google then no password will be supplied
    if (this.password){
        this.password = await bcrypt.hash(this.password, salt);
    } else {
        next();
    }
    next();
});

const UserModel = mongoose.model('passportUser', UserSchema);

module.exports = UserModel;