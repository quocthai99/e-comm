const express = require('express')

const userControllers = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')


const router = express.Router()

router.post('/register', userControllers.register)
router.post('/login', userControllers.login)

router.get('/users', [verifyAccessToken, isAdmin], userControllers.getUsers)
router.get('/detail-user',verifyAccessToken, userControllers.getUser)
router.put('/add-cart',verifyAccessToken, userControllers.addToCart)
router.delete('/remove-cart',verifyAccessToken, userControllers.removeCart)
router.put('/update-current',verifyAccessToken, uploader.single('avatar') ,userControllers.updateCurrent)
router.post('/refresh-token', userControllers.refreshToken)
router.post('/logout', verifyAccessToken, userControllers.logout)
router.put('/update-user/:uid', [verifyAccessToken, isAdmin], userControllers.updateUser)
router.delete('/delete-user/:uid', [verifyAccessToken, isAdmin], userControllers.deleteUser)

module.exports = router