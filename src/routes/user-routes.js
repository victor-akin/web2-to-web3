const router = require('express').Router()
const userController = require('../controllers/userController')
const { isValidSignupPayload } = require('../middlewares/checkSignupPayload')

router.post(
    '/signin',
    isValidSignupPayload,
    userController.signup
)

module.exports = router