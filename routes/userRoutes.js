const express = require('express');
const { loginUser, signupUser, verifyUser } = require('../controllers/userController');
const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// email verification route
router.get('/:id/verify/:token', verifyUser)

module.exports = router;