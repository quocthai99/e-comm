const jwt = require('jsonwebtoken')

const verifyAccessToken = async(req, res, next) => {
    if(req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) return res.status(401).json({
                status: false,
                message: 'Invalid accessToken' // token het han
            })
            
            req.user = decode
            next()
        })
    } else {
        return res.status(401).json({
            status: false,
            message: 'Require authentication!' // chua dang nhap k co token o header
        })
    }
}

const isAdmin = (req, res, next) => {
    const { isAdmin } = req.user
    if ( !isAdmin ) throw new Error('Require role admin') // role admin
    next()
}

module.exports = {
    verifyAccessToken,
    isAdmin
}