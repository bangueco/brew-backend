const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const middleware = require('../utils/middleware')

usersRouter.get('/users', async (request, response) => {
  const users = await User.findAll()

  return response.status(200).json(users)
})

usersRouter.post('/users/info', middleware.authenticateToken, (request, response) => {
  return response.status(200).json({userData: request.user})
})

usersRouter.post('/login', async (request, response, next) => {
  try {

    let { username, password } = request.body

    const user = await User.findOne({where: { username: username }})

    if (!user) {
      return response.status(400).json({error: 'invalid username'})
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return response.status(400).json({error: 'invalid password'})
    }

    const token = jwt.sign({
      id: user.id, username: 
      user.username, 
      first_name: user.first_name, 
      last_name: user.last_name
    }, process.env.SECRET_KEY, {expiresIn: '1 year'})
    
    return response.status(200).json({token: token})

  } catch(error) {
    return next(error)
  }
})

usersRouter.post('/register', async (request, response, next) => {
  try {

    let { username, first_name, last_name, password } = request.body

    if (!password != true) {
      const saltRounds = 10
      password = await bcrypt.hash(password, saltRounds)
    }

    const newUser = await User.create({
      username, first_name, last_name, password
    })
  
    return response.status(201).json(newUser)

  } catch(error) {
    next(error)
  }
})

module.exports = usersRouter