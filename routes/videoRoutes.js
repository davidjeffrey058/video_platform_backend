const express = require('express');
const Videos = require('../models/videoModel');
const router = express.Router();
const { getSingleVideo, uploadVideo, getAllVideos } = require('../controllers/videoController');
const requireAuth = require('../middlewares/requireAuth');
const isAdmin = require('../middlewares/isAdmin');


router.use(requireAuth);

// Get a single video
router.get('/', getSingleVideo);
router.get('/all', getAllVideos);

router.use(isAdmin);
// Upload a video
router.post('/', uploadVideo);

// Delete a video
// router.delete('/:id', (req, res) => {

// });


module.exports = router;