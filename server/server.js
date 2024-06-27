const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const dbConnect = require('./src/config/dbConnect')
const initRoutes = require('./src/routes')


const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbConnect()
initRoutes(app)

const port = process.env.PORT || 8888

app.listen(port, () => {
    console.log('Server is running in port', + port)
})