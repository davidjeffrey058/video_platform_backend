require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const videoRoutes = require('./routes/videoRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
// app.use((req, res, next) => {
//     console.log(req.path, req.method);
//     next();
// });

app.get('/', (req, res) => {
    res.redirect('/api/videos');
})

// routes
app.use('/api/videos', videoRoutes);
app.use('/api/users', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening at port ', process.env.PORT)
        });
    })
    .catch(err => {
        console.log(err);
    });

