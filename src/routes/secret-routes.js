const router = require('express').Router()
const secretController = require('../controllers/secretController')
const auth = require('../middlewares/auth')

router.get(
    '/secret',
    auth.isAuthenticated,
    secretController.getRandomSecret
)

module.exports = router