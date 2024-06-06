const { DataTypes} = require('sequelize')
const db = require('../database/db')

const User = db.sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      unique: true,
      validate: {
        notEmpty: true,
        min: 3,
        max: 15
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        max: 18,
        notNull: {
          msg: 'First name is required'
        },
        notEmpty: {
          msg: 'First name must not be empty'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        max: 18,
        notNull: {
          msg: 'Last name is required'
        },
        notEmpty: {
          msg: 'Last name must not be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password must not be empty'
        }
      }
    }
  }
)

module.exports = User