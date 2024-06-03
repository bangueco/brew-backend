const express = require('express')
const cors = require('cors')

const middleware = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())

// Middleware
app.use(middleware.unknownEndPoint)

module.exports = app