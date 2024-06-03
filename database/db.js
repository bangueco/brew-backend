const path = require('path')
const logger = require('../utils/logger')
const sqlite3 = require('sqlite3').verbose()


// Connect to database
const dbPath = path.resolve(__dirname, 'brew.db')
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (error) => {
  if (error) logger.error(error.message)

  logger.info('Connected to database')
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL
  )`)
})

module.exports = db