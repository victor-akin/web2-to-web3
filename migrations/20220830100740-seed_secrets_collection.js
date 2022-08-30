const randomSentence = require('random-sentence');

module.exports = {
    async up(db, client) {
        for (let i = 1; i <= 20; i++) {
            await db.collection('secrets').insertOne({ message: randomSentence() });
        }
    },

    async down(db, client) {
    }
};
