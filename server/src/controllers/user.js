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
        const accessToken = generateAccessToken(user._id, user.isAdmin);
        const refreshToken = generateRefreshToken(user._id);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true ,maxAge: 7 * 24 * 60 * 60 * 1000 });
        const userData = await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true } ).select('-refreshToken -password')
        
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

    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decode) => {
        
        const user = await User.findOne({ _id: decode._id })
        if(user.refreshToken !== refreshToken) throw new Error('refresh token is not equal refresh token in database')
        if(err) throw new Error('Refreshtoken is wrong')
            
        const newAccessToken = generateAccessToken(user._id, user.isAdmin)
        const newRefreshToken = generateRefreshToken(user._id)

        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true ,maxAge: 7 * 24 * 60 * 60 * 1000 });

        const updatedRefresh = await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken }, { new: true } )
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
    console.log('id:', _id )
    const user = await User.findById(_id).select('-password -refreshToken')
    console.log('user:', user )
    if(!user) throw new Error('User not found')
    return res.status(200).json({
        status: true,
        user
    })
})

const updateCurrent = asyncHandler(async(req, res) => {
    const { _id } = req.user
    if (req.file) req.body.avatar = req.file.path
    const updatedCurrent = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-refreshToken')
    const newAccessToken = generateAccessToken(updatedCurrent._id, updatedCurrent.isAdmin, process.env.JWT_SECRET)
    if (updatedCurrent) {
        return res.status(200).json({ 
            status: true,
            message: 'Updated current',
            user: updatedCurrent,
            accessToken: newAccessToken
        })
    }
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
    updateCurrent
};
