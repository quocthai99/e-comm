const { errHandler, notFound } = require('../middlewares/errorHandler')
const userRoutes = require('./user')
const productRoutes = require('./product')

const initRoutes = app => {
    app.use('/api/user', userRoutes)
    app.use('/api/product', productRoutes)


    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes