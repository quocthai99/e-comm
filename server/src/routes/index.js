const { errHandler, notFound } = require('../middlewares/errorHandler')
const userRoutes = require('./user')

const initRoutes = app => {
    app.use('/api/user', userRoutes)


    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes