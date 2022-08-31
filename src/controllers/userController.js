const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env
const { u8aToHex } = require('@polkadot/util');
const ChallengeCode = require('../models/challengeCodeModel')
const { cryptoWaitReady, decodeAddress, signatureVerify } = require('@polkadot/util-crypto');

exports.signup = async (req, res) => {

    const { message, username, signature, challengeCode } = req.body

    let lastChallenge = await ChallengeCode.findOne({ challenge: challengeCode })

    if (lastChallenge.isExpired() || lastChallenge.hasBeenUsed()) {
        return res.status(400).send({ message: 'time expired for challengeCode. Request for a new one' })
    }

    lastChallenge.usedAt = Date.now()
    await lastChallenge.save()

    try {
        await cryptoWaitReady();

        const isValid = isValidSignature(message, signature, username);

        if (!isValid) throw new Error('invalid signature')

    } catch (err) {
        return res.status(400).send({ message: 'unable to verify' })
    }

    let token = jwt.sign({ username }, JWT_SECRET_KEY, { expiresIn: 60 * 60 });

    res.header('Authorization', `Bearer ${token}`)

    res.status(200).send({ message: "logged in" })
}

exports.generateChallengeCode = async (req, res) => {
    const { address } = req.body

    let challengeCode = crypto.randomBytes(30).toString('hex');

    let lastChallenge = await ChallengeCode.findOne({ requester: address, usedAt: null })

    if (lastChallenge === null) {

        await new ChallengeCode({
            challenge: challengeCode,
            requester: address,
            createdAt: Date.now()
        }).save()

    } else {

        if (lastChallenge.isExpired()) {
            lastChallenge.createdAt = Date.now()
            lastChallenge.challenge = challengeCode

            await lastChallenge.save()
        }

        challengeCode = lastChallenge.challenge
    }

    res.send({ challengeCode })
}

const isValidSignature = (signedMessage, signature, address) => {
    const publicKey = decodeAddress(address);

    const hexPublicKey = u8aToHex(publicKey);

    return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
};


