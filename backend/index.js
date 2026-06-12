const express = require('express');
const cors = require('cors');
require('dotenv').config();
const leadsRouter = require('./routes/leads');
const chatRouter = require('./routes/chat');
const newsRouter = require('./routes/news');
const servicesRouter = require('./routes/services');
const testimonialsRouter = require('./routes/testimonials');
const pool = require('./db/connection');

const app = express();

app.use(cors());
app.use(express.json());

// Check DB connection on startup
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL Database.');
        connection.release();
    }
});

app.use('/api/leads', leadsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/news', newsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/testimonials', testimonialsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
