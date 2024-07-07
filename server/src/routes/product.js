const express = require('express')

const productControllers = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')


const router = express.Router()

router.post('/create-product', uploader.fields([
    {name: 'images', maxCount: 10},
    {name: 'thumb', maxCount: 1}
]) ,productControllers.createProduct)
router.get('/get-products', productControllers.getProducts)
router.post('/add-variant/:pid', verifyAccessToken, isAdmin, uploader.fields([
    {name: 'images', maxCount: 10},
    {name: 'thumb', maxCount: 1}
]) ,productControllers.addVarriant)

module.exports = router