const { errHandler, notFound } = require('../middlewares/errorHandler')
const userRoutes = require('./user')
const productRoutes = require('./product')
const orderRoutes = require('./order')

const initRoutes = app => {
    app.use('/api/user', userRoutes)
    app.use('/api/product', productRoutes)
    app.use('/api/order', orderRoutes)


    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes