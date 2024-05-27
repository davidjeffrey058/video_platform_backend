const Videos = require('../models/videoModel');

const getSingleVideo = async (req, res) => {
    try {
        const query = req.query;
        const current = parseInt(query.current) || 0;
        const doc_count = await Videos.countDocuments();
        const result = await Videos.findOne().skip(current);
        res.status(200).json({ doc_count: doc_count, result: result });

    } catch (error) {
        res.status(500).json({ error: "Unable to fetch video" });
    }
};

const uploadVideo = async (req, res) => {
    const { title, description, url } = req.body;
    try {
        const result = await Videos.create({ title, description, url });

        if (!result) return res.status(500).json({ error: 'Unable to add video' });

        res.status(201).json({ message: 'Video added successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getSingleVideo,
    uploadVideo
}