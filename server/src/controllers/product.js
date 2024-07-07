const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const Product = require('../models/product');

const createProduct = asyncHandler(async (req, res) => {
    const { name, category, brand, description, price } = req.body;
    if (!name || !category || !brand || !description || !price) throw new Error('Missing input');
    req.body.slug = slugify(name);
console.log(req.files)
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

module.exports = {
    createProduct,
    getProducts,
    addVarriant,
};
