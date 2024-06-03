const path = require('path')
const { Sequelize } = require('sequelize')
const logger = require('../utils/logger')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, './brew.db')
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