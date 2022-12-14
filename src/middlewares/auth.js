const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env

exports.isAuthenticated = async (req, res, next) => {
    let token = req.get('Authorization') ?? ''
    token = token.split(' ')[1]

    try {
        let userToken = jwt.verify(token, JWT_SECRET_KEY)

        req.address = userToken.address

        next()
    } catch (err) {
        res.status(401).send({ success: false, message: "Unable to authenticate" })
    }
}