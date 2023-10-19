const express = require('express')
const router = express.Router()
const auth = require("./middleware/auth")
const userControllers = require('./controllers/userControllers')

/// ROUTES ///

// users //
router.post('/user/signup', userControllers.signup)
router.post('/user/login', userControllers.login)
router.get('/users', userControllers.getUsers)
router.get('/user/:id', userControllers.getUser)
router.post('/user/create', userControllers.createUser)
router.patch('/user/update/:id', auth, userControllers.updateUser)
router.delete('/user/delete/:id', auth, userControllers.deleteUser)

module.exports = router
