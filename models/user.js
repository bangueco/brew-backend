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
        notEmpty: true,
        min: 2,
        max: 18
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 2,
        max: 18
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
)

module.exports = User