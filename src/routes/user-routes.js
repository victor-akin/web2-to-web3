const router = require('express').Router()
const userController = require('../controllers/userController')
const { isValidSignupPayload, isValidAddressString } = require('../middlewares/checkSignupPayload')

router.post(
    '/signin',
    isValidSignupPayload,
    userController.signup
)

router.post(
    '/challengecode',
    isValidAddressString,
    userController.generateChallengeCode
)

module.exports = router