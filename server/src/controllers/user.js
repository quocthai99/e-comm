const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');

const hashPassword = (password) => bcrypt.hashSync(password, 10);
const register = asyncHandler(async (req, res) => {
    const { name, email, password, phone, confirmPassword } = req.body;
    if (password !== confirmPassword) throw new Error('The password is equal confirmPassword');
    const user = await User.findOne({ email });

    if (user) throw new Error('User has existed');
    else {
        const createdUser = await User.create({
            name,
            email,
            password: hashPassword(password),
            phone,
        });
        return res.status(200).json({
            status: true,
            message: 'Created user success',
            createdUser,
        });
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('User is not existed! Please register');

    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    if (!isCorrectPassword) throw new Error('Password wrong');

    if (user && isCorrectPassword) {
        const accessToken = generateAccessToken(user._id, user.isAdmin);
        const refreshToken = generateRefreshToken(user._id);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        const userData = await User.findByIdAndUpdate(user._id, { refreshToken, accessToken }, { new: true }).select(
            '-refreshToken -password',
        );

        return res.status(200).json({
            status: true,
            user: userData,
            message: 'Login is success',
        });
    } else {
        throw new Error('Invalid credential!');
    }
});

const refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new Error('No refreshtoken in cookies. Please login');
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decode) => {
        const user = await User.findOne({ _id: decode._id });

        if (user.refreshToken !== refreshToken) throw new Error('refresh token is not equal refresh token in database');
        if (err) throw new Error('Refreshtoken is wrong');

        const newAccessToken = generateAccessToken(user._id, user.isAdmin);
        const newRefreshToken = generateRefreshToken(user._id);

        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

        await User.findByIdAndUpdate(
            user._id,
            { refreshToken: newRefreshToken, accessToken: newAccessToken },
            { new: true },
        );
        return res.status(200).json({
            status: true,
            newAccessToken,
        });
    });
});

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    await User.findOneAndUpdate(
        { refreshToken: cookie.refreshToken },
        { refreshToken: '', accessToken: '' },
        { new: true },
    );
    res.clearCookie('refreshToken');
    return res.status(200).json({
        status: true,
        message: 'Logout is done',
    });
});

const updateUser = async (req, res) => {};

const deleteUser = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    if (!uid) throw new Error('User is not existed');
    const deletedUser = await User.findByIdAndDelete(uid);
    if (!deletedUser) throw new Error('Delete failed');
    return res.status(200).json({
        status: true,
        message: 'Deleted User',
        deletedUser,
    });
});

const getUsers = asyncHandler(async (req, res) => {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'limit', 'fields', 'sort'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const query = JSON.parse(queryString);

    if (queryObj.q) {
        delete query.q;
        query['$or'] = [
            { name: { $regex: queryObj.q, $options: 'i' } },
            { email: { $regex: queryObj.q, $options: 'i' } },
        ];
    }
    let queries = User.find(query);

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    queries = queries.skip(skip).limit(limit);
    console.log('page:', page);
    console.log('limit:', limit);
    console.log('query:', query);
    console.log('==================');

    const counts = await User.find(query).countDocuments();
    const users = await queries;
    return res.status(200).json({
        status: true,
        counts,
        users,
    });
});

const getUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id)
        .select('-password -refreshToken')
        .populate({
            path: 'cart',
            populate: {
                path: 'product',
                select: 'name images',
            },
        });
    if (!user) throw new Error('User not found');
    return res.status(200).json({
        status: true,
        user,
    });
});

const updateCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (req.file) req.body.avatar = req.file.path;
    const updatedCurrent = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-refreshToken');
    const newAccessToken = generateAccessToken(updatedCurrent._id, updatedCurrent.isAdmin, process.env.JWT_SECRET);
    if (updatedCurrent) {
        return res.status(200).json({
            status: true,
            message: 'Updated current',
            user: updatedCurrent,
            accessToken: newAccessToken,
        });
    }
});

const addToCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id) throw new Error('please login');
    const { quantity, color, price, pid, thumb } = req.body;
    if (!quantity || !color || !price || !pid || !thumb) throw new Error('Missing inputs');

    const user = await User.findById(_id).select('cart');
    const variant = user.cart.find((item) => item.product.toString() === pid && item.color === color);
    
    if (variant) {
        const response = await User.findOneAndUpdate(
            { cart: { $elemMatch: variant } },
            { $set: { 'cart.$.quantity': quantity, 'cart.$.price': price } },
            { new: true },
        ).populate({
            path: 'cart',
            populate: {
                path: 'product',
                select: 'name',
            },
        });
        
        if (!response) throw new Error('Product exist');
        return res.status(200).json({
            status: true,
            message: 'Updated your variant',
            userCart: response
        });
    } else {
        const response = await User.findByIdAndUpdate(
            _id,
            { $push: { cart: { product: pid, quantity, price, color, thumb } } },
            { new: true },
        ).populate({
            path: 'cart',
            populate: {
                path: 'product',
                select: 'name',
            },
        });
        
        if (!response) throw new Error('Product exist');
        return res.status(200).json({
            status: true,
            message: 'Added your variant',
            userCart: response,
        });
    }
});

const removeCart = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { pid } = req.params
    const user = await User.findById(_id).select('cart')
    
    const alreadyProduct = user?.cart.find(el => el.product.toString() === pid)
    
    if(!alreadyProduct) return res.status(200).json({
        success: true,
        mes: 'your cart is empty'
    })
    const response = await User.findByIdAndUpdate(_id, { $pull: { cart: { product: pid }}}, { new: true })
    return res.status(200).json({
        status: true,
        message: 'deleted your cart',
        cartItem: response
    })
})

module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
    getUsers,
    getUser,
    refreshToken,
    logout,
    updateCurrent,
    addToCart,
    removeCart
};
