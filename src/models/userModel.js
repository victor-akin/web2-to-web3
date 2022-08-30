const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength: 100,
        minLength: 6
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

userSchema.pre('save', async function (next) {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next();
});

userSchema.methods.validPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj._id;
    delete obj.__v;

    return obj;
}

module.exports = mongoose.model('User', userSchema)