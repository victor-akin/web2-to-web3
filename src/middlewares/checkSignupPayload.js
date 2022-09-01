exports.isValidSignupPayload = (req, res, next) => {
    const { message, username, challengeCode } = req.body

    if (! /^[a-z0-9]+$/gi.test(username)) return res.status(400).send({ message: "username is invalid" })

    if (message.indexOf(username) === -1 || message.indexOf(challengeCode) === -1) {
        return res.status(400).send({ message: "message must have username and challengeCode in it" })
    }
    next()
}

exports.isValidAddressString = (req, res, next) => {
    const { address } = req.body

    if (address === undefined) return res.status(400).send({ message: "address is required" })

    if (! /^[a-z0-9]+$/gi.test(req.body.address)) return res.status(400).send({ message: "address is invalid" })

    next()
}