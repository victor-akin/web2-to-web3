module.exports = {
    async up(db, client) {
        await db.dropCollection('users');
    },

    async down(db, client) {
        await db.createCollection('users');
    }
};
