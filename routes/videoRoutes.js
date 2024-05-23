const express = require('express');
const Videos = require('../models/videoModel');
const router = express.Router();
const { getSingleVideo } = require('../controllers/videoController');
const requireAuth = require('../middlewares/requireAuth');


router.use(requireAuth);

// Get a single video
router.get('/', getSingleVideo);

// Upload a video
router.post('/', async (req, res) => {
    const { title, description, url } = req.body;

    try {
        const video = await Videos.create({ title, description, url });
        res.status(200).json(video)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

// Delete a video
router.delete('/:id', (req, res) => {

});


module.exports = router;