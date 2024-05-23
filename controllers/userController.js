const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const Token = require('../models/token');
const crypto = require('crypto');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.login(email, password);

        if (!user.verified) {
            let emailToken = await Token.findOne({ user_id: user._id });
            if (!emailToken) {
                const emailToken = await Token.create({ user_id: user._id, token: crypto.randomBytes(32).toString('hex') });
                const url = `${process.env.BASE_URL}/api/users/${user._id}/verify/${(await emailToken).token}`;

                await sendEmail(user.email, 'Verify your email', `Click on the link below to verify your email\n\n ${url}`);
            }
            // return res.status(400).json({ message: 'An email sent to your account please verify' });
            throw Error('Please verify your account in your email');
        }

        const token = createToken(user._id);
        res.status(200).json({ fullname: user.fullname, email, is_admin: user.is_admin, token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const signupUser = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        const user = await User.signup(fullname, email, password);

        const emailToken = await Token.create({ user_id: user._id, token: crypto.randomBytes(32).toString('hex') });

        const url = `${process.env.BASE_URL}/api/users/${user._id}/verify/${(await emailToken).token}`;

        await sendEmail(user.email, 'Verify your email', `Click on the link below to verify your email\n\n ${url}`);
        // const token = createToken(user._id);
        // res.status(200).json({ fullname, email, token });

        res.status(201).json({ message: "An Email sent to your account please verify" })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const verifyUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) res.satus(400).json({ message: "Invalid link" });

        const token = await Token.findOne({
            user_id: req.params.id,
            token: req.params.token
        })

        if (!token) res.satus(400).json({ message: "Invalid link" });

        await User.updateOne({ _id: user._id }, { $set: { verified: true } });
        await Token.deleteOne({ user_id: user._id })

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    loginUser,
    signupUser,
    verifyUser
}