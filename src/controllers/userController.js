const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env

exports.loginOrSignup = async (req, res) => {

    let user = await User.findOne({ username: req.body.username })

    try {
        if (user == null) {
            req.body.username = req.body.username.trim()

            user = await User.create(req.body)

            await user.save()
        } else {
            let isPasswordValid = await user.validPassword(req.body.password)

            if (!isPasswordValid) return res.status(400).send({ message: "Password is not correct" });
        }
    } catch (err) {
        return res.status(400).send({ message: "Invalid input" })
    }

    let token = jwt.sign({
        id: user._id.toString(),
        username: user.username
    }, JWT_SECRET_KEY, { expiresIn: 60 * 60 });

    res.header('Authorization', `Bearer ${token}`)

    res.status(200).send({ message: "logged in" })
}


