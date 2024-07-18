const Users = require('../models/userModel');
const isAdmin = async (req, res, next) => {
    const id = req.user;
    try {
        // console.log(id)
        const user = await Users.findOne({ _id: id });

        if (!user) return res.status(404).json({ error: 'User not found' });

        if (user.is_admin) return next();

        res.status(400).json({ error: 'Unauthorized request' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = isAdmin;