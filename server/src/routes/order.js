const express = require('express')

const orderControllers = require('../controllers/order')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')


const router = express.Router()

router.put('/add-cart', verifyAccessToken, orderControllers.updateCart)


module.exports = router