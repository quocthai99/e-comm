const express = require('express')

const userControllers = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

const router = express.Router()

router.post('/register', userControllers.register)
router.post('/login', userControllers.login)

router.get('/users', [verifyAccessToken, isAdmin], userControllers.getUsers)
router.get('/detail-user/:uid',verifyAccessToken, userControllers.getUser)
router.post('/refresh-token', userControllers.refreshToken)
router.put('/update-user/:uid', [verifyAccessToken, isAdmin], userControllers.updateUser)
router.delete('/delete-user/:uid', [verifyAccessToken, isAdmin], userControllers.deleteUser)

module.exports = router