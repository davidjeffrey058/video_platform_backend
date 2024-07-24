const Videos = require('../models/videoModel');
const { ref, getStorage, uploadBytes, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const app = require('../services/firebase');

const getSingleVideo = async (req, res) => {
    try {

        const video = await Videos.findOne({ _id: req.params.vid });
        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }
        res.status(200).json({ video });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Unable to fetch video" });
    }
};

const getAllVideos = async (req, res) => {
    try {
        const videos = await Videos.find()
            .sort({ createdAt: -1 });
        res.status(200).json({ videos });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An unknown error occured' });
    }
}


const videoUpload = async (req, res) => {
    try {
        const { title, description } = req.body;

        const storage = getStorage(app);

        const storageRef = ref(storage, `videos/${req.file.originalname}`);

        const metadata = {
            contentType: req.file.mimetype
        }

        const results = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadUrl = await getDownloadURL(results.ref);

        await Videos.create({ title, description, url: downloadUrl });

        res.status(201).json({ message: 'Video uploaded successfully' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occured' })
    }
}

module.exports = {
    getSingleVideo,
    videoUpload,
    getAllVideos,
}