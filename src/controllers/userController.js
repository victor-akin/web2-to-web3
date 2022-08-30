const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env
const { cryptoWaitReady, decodeAddress, signatureVerify } = require('@polkadot/util-crypto');
const { u8aToHex } = require('@polkadot/util');

exports.signup = async (req, res) => {

    const { message, username, signature } = req.body

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

const isValidSignature = (signedMessage, signature, address) => {
    const publicKey = decodeAddress(address);

    const hexPublicKey = u8aToHex(publicKey);

    return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
};


