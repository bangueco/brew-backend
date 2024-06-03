const express = require('express')
const cors = require('cors')
const db = require('./database/db')

const middleware = require('./utils/middleware')

const app = express()

// Sync database tables
db.syncTable()

app.use(cors())
app.use(express.json())

// Middleware
app.use(middleware.unknownEndPoint)

module.exports = app