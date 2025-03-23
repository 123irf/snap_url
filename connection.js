const mongoose = require('mongoose');
async function mongodbConnection(url) {
        await mongoose.connect(url);
        console.log('✅ MongoDB connected successfully');
}
module.exports = { mongodbConnection };
