const { default: mongoose } = require('mongoose')

const dbConnect = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        if (connect.connection.readyState === 1) console.log('DB connection is successfully')
        else console.log('Connect is failed')
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = dbConnect