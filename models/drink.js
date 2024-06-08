const { DataTypes} = require('sequelize')
const db = require('../database/db')

const Drink = db.sequelize.define(
  'Drink',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        max: 18,
        notNull: {
          msg: 'Drink name is required'
        },
        notEmpty: {
          msg: 'Drink name must not be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 2,
        max: 18,
        notNull: {
          msg: 'Price is required'
        },
        notEmpty: {
          msg: 'Price must not be empty'
        }
      }
    }
  }
)

module.exports = Drink