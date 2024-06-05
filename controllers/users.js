const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/users', async (request, response) => {
  const users = await User.findAll()

  return response.status(200).json(users)
})

usersRouter.post('/login', async (request, response) => {
  try {

    let { username, password } = request.body

    const user = await User.findOne({where: { username: username }})

    if (user.password !== password && !user) {
      throw new Error('invalid username or password')
    }

    

  } catch(error) {
    return response.status(400).json({'error': error})
  }
})

usersRouter.post('/register', async (request, response) => {
  try {

    let { username, first_name, last_name, password } = request.body

    const saltRounds = 10
    password = await bcrypt.hash(password, saltRounds)

    const newUser = await User.create({
      username, first_name, last_name, password
    })
  
    return response.status(201).json(newUser)

  } catch(error) {
    return response.status(400).json({'error': error})
  }
})

module.exports = usersRouter