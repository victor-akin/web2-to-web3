const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
    } catch (error) {
        console.error(error)
    }
}