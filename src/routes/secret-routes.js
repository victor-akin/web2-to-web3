const router = require('express').Router()
const secretController = require('../controllers/secretController')
const { isAuthenticated } = require('../middlewares/auth')

router.get(
    '/secret',
    isAuthenticated,
    secretController.getRandomSecret
)

module.exports = router