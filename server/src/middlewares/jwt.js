const jwt = require('jsonwebtoken')

const generateAccessToken = (uid, isAdmin) => jwt.sign({ _id: uid, isAdmin}, process.env.JWT_SECRET, { expiresIn: '30s' })
const generateRefreshToken = (uid) => jwt.sign({ _id: uid}, process.env.JWT_SECRET, { expiresIn: '7d' })

module.exports ={
    generateAccessToken,
    generateRefreshToken
}