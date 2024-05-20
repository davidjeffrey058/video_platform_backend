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

module.exports = {
    getSingleVideo
}