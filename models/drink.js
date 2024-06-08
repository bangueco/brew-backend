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
        min: {
          args: [10],
          msg: 'Price must be greater than or equal 10'
        },
        max: {
          args: [1000],
          msg: 'Price must be less than or equal 1000'
        },
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