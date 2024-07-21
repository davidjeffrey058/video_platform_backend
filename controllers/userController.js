const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const Token = require('../models/token');
const crypto = require('crypto');
const PassToken = require('../models/passwordToken');

const createToken = (_id, expiresIn = '3d') => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: expiresIn });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.login(email, password);

        if (!user.verified) {
            let emailToken = await Token.findOne({ user_id: user._id });
            if (!emailToken) {
                const emailToken = await Token.create({ user_id: user._id, token: crypto.randomBytes(32).toString('hex') });
                const url = `${process.env.FRONT_URL}/verify/${user._id}/${(await emailToken).token}`;

                await sendEmail(user.email, 'Verify your email', `Click on the link below to verify your email\n\n ${url} \n
                    Link expires in an hour`);
            }
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

        const url = `${process.env.FRONT_URL}/verify/${user._id}/${(await emailToken).token}`;

        await sendEmail(user.email, 'Verify your email', `Click on the link below to verify your email\n\n ${url}\n
            Link expires in an hour`);

        res.status(201).json({ message: "A verification link sent to your email please verify" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Verifies user email address
const verifyUser = async (req, res) => {
    const { id, token } = req.params;

    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(400).json({ error: "Invalid link" });
        }

        const signupToken = await Token.findOne({
            user_id: id,
            token: token
        });

        if (!signupToken) {
            return res.status(400).json({ error: "Invalid link" });
        }

        await User.updateOne({ _id: user._id }, { $set: { verified: true } });
        await Token.deleteOne({ user_id: user._id });

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Sends password reset ink
const resetPass = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ error: 'Email not found' });

        if (!user.verified) return res.status(400).json({ error: 'Email address not verified' });

        const token = await PassToken.findOne({ user_id: user._id });
        if (token) {
            await PassToken.deleteOne({ user_id: token.user_id });
        }

        const emailToken = await PassToken.create({ user_id: user._id, token: crypto.randomBytes(32).toString('hex') });

        const emailResponse = await sendEmail(user.email, 'Reset your password', `Click on the link to reset your password \n\n 
        ${process.env.FRONT_URL}/changepass/${user._id}/${emailToken.token}\n
        Link expires in an hour`);

        if (emailResponse) {
            return res.status(202).json({ message: "A password reset link sent to your email" });
        }

        res.status(500).json({ error: 'Error sending password reset link' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Changes the password
const changePass = async (req, res) => {
    const { uid, token } = req.params;
    const { password } = req.body;

    // console.log(params, body);
    try {
        const user = await User.findOne({ _id: uid });
        if (!user) return res.status(400).json({ error: "Invalid link" });

        const passToken = await PassToken.findOne({
            user_id: uid,
            token: token
        });

        if (!passToken) return res.status(400).json({ error: "Invalid link" });

        await User.changePassword(user._id, password);

        await PassToken.deleteOne({ user_id: user._id });

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An unknown error occured' });
    }
}

module.exports = {
    loginUser,
    signupUser,
    verifyUser,
    resetPass,
    changePass
}