const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

// static signup method
userSchema.statics.signup = async function (fullname, email, password) {

    if (!fullname || !email || !password) throw Error('All Fields are required');
    if (!validator.isEmail(email)) throw Error('Enter a valid email address');
    if (!validator.isStrongPassword(password)) throw Error('Password must contain a number, a special character, a capital letter, and must be 8 length long');

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ fullname, email, password: hash });

    return user;
}


module.exports = mongoose.model('User', userSchema)