const express = require('express')
const cors = require('cors')
const db = require('./database/db')

const usersRouter = require('./controllers/users')

const middleware = require('./utils/middleware')

const app = express()

// Sync database tables
db.syncTable()

app.use(cors())
app.use(express.json())

// Routing
app.use('/api', usersRouter)

// Middleware
app.use(middleware.unknownEndPoint)

module.exports = app