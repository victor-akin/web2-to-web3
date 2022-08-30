const mongoose = require('mongoose')

const secretSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }
});

secretSchema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj._id;
    delete obj.__v;

    return obj;
}

module.exports = mongoose.model('Secret', secretSchema)