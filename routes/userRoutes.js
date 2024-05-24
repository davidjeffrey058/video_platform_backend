const express = require('express');
const { loginUser, signupUser, verifyUser, resetPass, changePass } = require('../controllers/userController');
const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// email verification route
router.get('/:id/verify/:token', verifyUser);

// reset password route
router.post('/password-reset', resetPass);

// change password route
router.post('/change-pass/:uid/:token', changePass);

module.exports = router;