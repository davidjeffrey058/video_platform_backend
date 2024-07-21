const express = require('express');
const router = express.Router();
const { getSingleVideo, getAllVideos, videoUpload } = require('../controllers/videoController');
const requireAuth = require('../middlewares/requireAuth');
const isAdmin = require('../middlewares/isAdmin');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
});

router.use(requireAuth);

router.get('/:vid', getSingleVideo);
router.get('', getAllVideos);

router.use(isAdmin);
router.post('/upload', upload.single('file'), videoUpload)

module.exports = router;