const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hashPassword = password => bcrypt.hashSync(password, 10)

const register = async({ name, email, password, phone}) => {
    try {
        const checkUser = await User.findOne({email})
        if(checkUser) {
            return {
                status: false,
                message: 'The email is already'
            }
        }
        
        const createdUser = await User.create({
            name,
            email,
            password: hashPassword(password),
            phone,
        })
        if (createdUser) {
            return {
                status: true,
                message: 'Created user success',
                createdUser
            }
        }
    } catch (error) {
        return error
    }
}

const login = async({ email, password }) => {
    try {
        const user = await User.findOne({email})
        if(!user) {
            return {
                status: false,
                message: 'The user is not defined'
            }
        }

        const isCorrectPassword = bcrypt.compareSync(password, user.password)
        if (!isCorrectPassword) {
            return {
                status: false,
                message: 'Password is wrong'
            }
        }
        const accessToken = generateAccessToken(user._id, user.isAdmin)
        const refreshToken = generateRefreshToken(user._id)
        
        if (user && isCorrectPassword) {
            return {
                status: true,
                message: 'Login success',
                accessToken,
                refreshToken
            }
        }
    } catch (error) {
        return error
    }
}

const updateUser = async(uid, {name, email, phone}) => {
    try {
        const user = await User.findById(uid)
        if(!user) {
            return {
                status: false,
                message: 'The user is not defined'
            }
        }

        const updatedUser = await User.findByIdAndUpdate(uid, { name, email, phone}, { new: true })
        if (!updatedUser) {
            return {
                status: false,
                message: 'Cannot update user'
            }
        }

        return {
            status: true,
            message: 'Updated user',
            updatedUser
        }
        
    } catch (error) {
        return error
    }
}

const deleteUser = async(uid) => {
    try {
        const user = await User.findById(uid)
        if(!user) {
            return {
                status: false,
                message: 'The user is not defined'
            }
        }
        
        await User.findByIdAndDelete(uid)
        return {
            status: true,
            mes: 'Deleted user'
        }
        
    } catch (error) {
        return error
    }
}

const getUsers = async() => {
    try {
        const users = await User.find()
        return {
            status: true,
            message: 'Got users',
            users
        }
        
    } catch (error) {
        return error
    }
}

const getUser = async(uid) => {
    try {
        const user = await User.findById(uid)
        if(!user) {
            return {
                status: false,
                message: 'The user is not defined'
            }
        }

        return {
            status: true,
            message: 'Got User',
            user
        }
        
    } catch (error) {
        return error
    }
}

const refreshToken = async(token) => {
    try {
        const response = await jwt.verify(token, process.env.JWT_SECRET)
        const result = await User.findOne({ _id: response._id })
        return {
            status: result ? true : false,
            accessToken: result ? generateAccessToken(result._id, result.isAdmin) : 'refreshtoken not match',
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
    getUsers,
    getUser,
    refreshToken
}