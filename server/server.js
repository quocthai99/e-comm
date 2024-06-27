const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const dbConnect = require('./src/config/dbConnect')


const app = express()
const port = process.env.PORT || 8888

app.get('/', (req, res) => {
    return res.send('Hello world and vietnamese')
})
dbConnect()

app.listen(port, () => {
    console.log('Server is running in port', + port)
})