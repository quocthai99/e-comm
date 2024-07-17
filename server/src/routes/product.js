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
router.get('/get-product/:pid', productControllers.getProduct)
router.post('/add-variant/:pid', verifyAccessToken, isAdmin, uploader.fields([
    {name: 'images', maxCount: 10},
    {name: 'thumb', maxCount: 1}
]) ,productControllers.addVarriant)
router.put('/update-product/:pid', verifyAccessToken, isAdmin, uploader.fields([
    {name: 'images', maxCount: 10},
    {name: 'thumb', maxCount: 1}
]) ,productControllers.updateProduct)

module.exports = router