const mongoose = require('mongoose')

const challengeCodeSchema = new mongoose.Schema({
    challenge: {
        type: String,
        required: true,
        index: true
    },
    requester: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    usedAt: Date
});

challengeCodeSchema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj._id;
    delete obj.__v;

    return obj;
}

challengeCodeSchema.methods.isExpired = function () {
    return ((Date.now() - new Date(this.createdAt)) / 1000) >= (3 * 60)
}

challengeCodeSchema.methods.hasBeenUsed = function () {
    return !!this.usedAt
}

module.exports = mongoose.model('ChallengeCode', challengeCodeSchema)