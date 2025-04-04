require('dotenv').config();
const express = require('express');
const path = require('path');
const { mongodbConnection } = require('./connection');
const app = express();
const urlRouter = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const URL = require('./models/url');
const port = process.env.PORT || 10000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/url', urlRouter);
app.use('/', staticRouter);
app.get('/:shortid', async (req, res) => {
    try {
        const { shortid } = req.params;
        const entry = await URL.findOne({ shortid });
        if (!entry) {
            return res.status(404).send('URL not found');
        }
        
        res.redirect(entry.redirectURL);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

mongodbConnection(process.env.MONGO_URL);
//this my fist

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running at ${baseUrl}`);
});
