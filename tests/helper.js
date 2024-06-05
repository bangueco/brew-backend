const User = require('../models/user')

const usersInDB = async () => {
  const users = await User.findAll()
  return users.map(user => user.toJSON())
}

module.exports = { usersInDB }