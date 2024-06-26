const express = require('express')
const cors = require('cors')
const db = require('./database/db')

const usersRouter = require('./controllers/users')
const drinksRouter = require('./controllers/drinks')

const middleware = require('./utils/middleware')

const app = express()

// Sync database tables
db.syncTable()

app.use(cors())
app.use(express.json())

// Routing
app.use('/api', usersRouter)
app.use('/api/drinks', drinksRouter)

// Middleware
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app