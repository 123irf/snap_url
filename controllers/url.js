const URLModel = require('../models/url');
const shortid = require('shortid');
const { URL } = require('url'); // Explicitly import Node's URL class

function isValidUrl(url) {
    try {
        new URL(url); // Now clearly uses the Node.js built-in class
        return true;
    } catch (err) {
        return false;
    }
}

async function generateShortId(req, res) {
    try {
        const { url } = req.body;

        if (!url || !isValidUrl(url)) {
            return res.status(400).render('home', { id: null, error: 'Invalid URL. Please enter a valid URL starting with http:// or https://.' });
        }

        const shortidGenerated = shortid.generate();
        await URLModel.create({ shortid: shortidGenerated, redirectURL: url });

        res.render('home', { id: shortidGenerated, error: null });
    } catch (err) {
        console.error('Error generating short URL:', err.message);
        res.status(500).render('home', { id: null, error: 'Failed to generate short URL.' });
    }
}

module.exports = { generateShortId };
