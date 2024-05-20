const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const loginUser = (req, res) => {

}

const signupUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {

        const user = await User.signup(fullname, email, password);
        const token = createToken(user._id);
        res.status(200).json({ fullname, email, token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    loginUser,
    signupUser
}