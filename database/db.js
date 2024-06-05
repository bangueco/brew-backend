const path = require('path')
const { Sequelize } = require('sequelize')
const logger = require('../utils/logger')

const config = require('../utils/config')

const databasePath = config.DATABASE

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, databasePath)
});

const syncTable = async () => {
  try {
    await sequelize.sync()
    logger.info('Tables synced successfully')
  } catch(error) {
    logger.error(error)
  }
}

module.exports = { sequelize, syncTable }