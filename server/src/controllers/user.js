const userServices = require('../services/user')

const register = async(req, res) => {
    try {
        const { name, email, password, phone, confirmPassword } = req.body
        if(!name || !email || !password || !phone || !confirmPassword) {
            return res.status(400).json({
                status: false,
                message: 'Missing inputs'
            })
        } else if(password !== confirmPassword) {
            return res.status(400).json({
                status: false,
                message: 'The password is equal confirmPassword'
            })
        }

        const response = await userServices.register(req.body)
        if(response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const login = async(req, res) => {
    try {
        const { password, email } = req.body
        if(!password || !email) {
            return res.status(400).json({
                status: false,
                message: 'Missing inputs'
            })
        }

        const response = await userServices.login(req.body)
        if(response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateUser = async(req, res) => {
    try {
        const { uid } = req.params
        const { name, email, phone } = req.body
        if(!uid) {
            return res.status(400).json({
                status: false,
                message: 'User not found'
            })
        }

        if (!name || !email || !phone) {
            return res.status(400).json({
                status: false,
                message: 'Missing inputs'
            })
        }

        const response = await userServices.updateUser(uid, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteUser = async(req, res) => {
    try {
        const { uid } = req.params
        if(!uid) {
            return res.status(400).json({
                status: false,
                message: 'User not found'
            })
        }

        const response = await userServices.deleteUser(uid)
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getUsers = async(req, res) => {
    try {
        const response = await userServices.getUsers()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getUser = async(req, res) => {
    try {
        const { uid } = req.params
        if(!uid) {
            return res.status(400).json({
                status: false,
                message: 'User not found'
            })
        }

        const response = await userServices.getUser(uid)
        return res.status(200).json(response)

    } catch (error) {
        return error
    }
}

const refreshToken = async(req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(200).json({
                status: false,
                message: 'The token is required'
            })
        }

        const response = await userServices.refreshToken(token)
        return res.status(200).json(response)
        
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