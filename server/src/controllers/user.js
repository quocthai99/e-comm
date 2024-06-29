const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/user');
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt')

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
    const { email, password } = req.body
    const user = await User.findOne({ email });

    const isCorrectPassword = bcrypt.compareSync(password, user.password)
    if (user && isCorrectPassword) {
        const { password, isAdmin, ...userData } = user.toObject();
        const accessToken = generateAccessToken(user._id, isAdmin);
        const refreshToken = generateRefreshToken(user._id);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true } )
        return res.status(200).json({
            status: true,
            user: userData,
            accessToken,
            message: 'Login is success'
        });
    } else {
        throw new Error('Invalid credential!');
    }
});

const refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) throw new Error('No refreshtoken in cookies. Please login')

    jwt.verify(refreshToken, process.env.JWT_SECRET, async(err, user) => {
        if (err) throw new Error(err)
        
        const newAccessToken = generateAccessToken(user._id, user.isAdmin)
        const newRefreshToken = generateRefreshToken(user._id)

        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        await User.findByIdAndUpdate(user._id, { newRefreshToken }, { new: true } )

        return res.status(200).json({
            status: true,
            newAccessToken
        })
    })
})

const logout = asyncHandler(async(req, res) => {
    const cookie = req.cookies
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken}, {refreshToken: ''}, { new: true })
    res.clearCookie('refreshToken')
    return res.status(200).json({
        status: true,
        message: 'Logout is done'
    })
})


const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

const getUsers = async (req, res) => {};

const getUser = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-password')
    if(!user) throw new Error('User not found')
    return res.status(200).json({
        status: true,
        user
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
    logout
};
