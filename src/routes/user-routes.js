const router = require('express').Router()
const userController = require('../controllers/userController')

router.post(
    '/signin',
    userController.loginOrSignup
)

module.exports = router