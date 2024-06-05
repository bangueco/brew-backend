require('dotenv').config()

const PORT = process.env.PORT
const DATABASE = process.env.NODE_ENV === 'test' ? process.env.TEST_DB : process.env.PROD_DB

module.exports = {
  PORT,
  DATABASE
}