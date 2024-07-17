const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const Product = require('../models/product');

const createProduct = asyncHandler(async (req, res) => {
    const { name, category, brand, description, price, color } = req.body;
    if (!name || !category || !brand || !description || !price || !color) throw new Error('Missing input');
    req.body.slug = slugify(name);
    const thumb = req.files.thumb[0].path
    const images = req.files.images.map(img => img.path)
    if (thumb) req.body.thumb = thumb
    if (images) req.body.images = images

    const newProduct = await Product.create(req.body);
    if (!newProduct) throw new Error('Cannot create product');
    return res.status(200).json({
        status: true,
        message: 'Created product',
    });
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    return res.status(200).json({
        status: true,
        message: 'Get products',
        products,
    });
});

const addVarriant = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!pid) throw new Error('cannot found product');
    const { price, color } = req.body;

    if (!price && !color) throw new Error('Missing input');
    const thumb = req.files.thumb[0].path;
    const images = req.files.images.map((img) => img.path);
    if (thumb) req.body.thumb = thumb;
    if (images) req.body.images = images;

    const addedVarriant = await Product.findByIdAndUpdate(pid, {
        $push: { variants: { color, price, thumb, images } },
    });
    if (!addedVarriant) throw new Error('Cannot add variant');
    return res.status(200).json({
        status: true,
        message: 'Added varriant',
    });
});

const getProduct = asyncHandler(async(req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    if(!product) throw new Error('Product not found')
    
    return res.status(200).json({
        status: true,
        product
    })
})

const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!pid) throw new Error('cannot found product');
    const { price, color, name, category, brand } = req.body;

    if (!price || !color || !name || !category || !brand ) throw new Error('Missing input');
    const thumb = req.files.thumb[0].path;
    const images = req.files.images.map((img) => img.path);
    if (thumb) req.body.thumb = thumb;
    if (images) req.body.images = images;

    const updatedProduct = await Product.findByIdAndUpdate(pid, { color, price, name, category, brand, thumb, images }, { new: true });
    console.log(updatedProduct)
    if (!updatedProduct) throw new Error('Cannot update product');
    return res.status(200).json({
        status: true,
        message: 'Updated product',
    });
});

module.exports = {
    createProduct,
    getProducts,
    addVarriant,
    getProduct,
    updateProduct
};
