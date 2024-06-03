const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.findAll()

  return response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  try {

    let { first_name, last_name, password } = request.body

    const saltRounds = 10
    password = await bcrypt.hash(password, saltRounds)

    const newUser = await User.create({
      first_name, last_name, password
    })
  
    return response.status(201).json(newUser)

  } catch(error) {
    return response.status(400).json({'error': error.errors[0].message})
  }
})

module.exports = usersRouter