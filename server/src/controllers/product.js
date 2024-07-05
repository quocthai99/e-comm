const asyncHandler = require('express-async-handler');
const slugify = require('slugify')

const Product = require('../models/product');


const createProduct = asyncHandler(async( req, res ) => {
    const { name, category, brand, description } = req.body
    
    if ( !name || !category || !brand || !description ) throw new Error('Missing input')
    req.body.slug = slugify(name)
    const newProduct = await Product.create(req.body)
    if (!newProduct ) throw new Error('Cannot create product')
    return res.status(200).json({
        status: true,
        message: 'Created product'
    })    
})

const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find()
    return res.status(200).json({
        status: true,
        message: 'Get products',
        products
    })
})


const addVarriant = asyncHandler(async(req, res) => {
    const { pid } = req.params
    if (!pid) throw new Error('ccannot found product')
    const { name, price, color, thumb, images } = req.body
    
    if (!name && !price && !color ) throw new Error('Missing input')
    
    const addedVarriant = await Product.findByIdAndUpdate(pid, { $push: { variants: { color, price, name, thumb, images } }})
    if (!addedVarriant) throw new Error('Cannot add variant')
    return res.status(200).json({
        status: true,
        message: 'Added varriant',
    })
})

module.exports = {
    createProduct,
    getProducts,
    addVarriant
}