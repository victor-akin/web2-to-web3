exports.isValidSignupPayload = (req, res, next) => {
    const { message, username } = req.body

    if (! /^[a-z0-9]+$/gi.test(username)) return res.status(400).send({ message: "username is invalid" })

    if (message.indexOf(username) === -1) return res.status(400).send({ message: "message must have username in it" })

    next()
}