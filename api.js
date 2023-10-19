const express = require('express')
const router = express.Router()
const userControllers = require('./controllers/userControllers')

/// ROUTES ///

// users //
router.get('/user', userControllers.getUsers)
router.get('/user/:id', userControllers.getUser)
router.post('/user', userControllers.createUser)
router.patch('/user/:id', userControllers.updateUser)
router.delete('/user/:id', userControllers.deleteUser)

module.exports = router
