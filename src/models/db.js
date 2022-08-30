const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/web2-to-web3');
    } catch (error) {
        console.error(error)
    }
}