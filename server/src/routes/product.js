const express = require('express')

const productControllers = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')


const router = express.Router()

router.post('/create-product', productControllers.createProduct)
router.get('/get-products', productControllers.getProducts)
router.post('/add-variant/:pid', productControllers.addVarriant)

module.exports = router