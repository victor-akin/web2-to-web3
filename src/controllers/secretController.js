const Secret = require('../models/secretModel')

exports.getRandomSecret = async (req, res) => {
    let secrets = await Secret.find({})

    res.send(secrets[Math.floor(Math.random() * secrets.length)])
}