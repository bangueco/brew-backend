const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.findAll()

  return response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  try {

    const newUser = await User.create({
      first_name: request.body.first_name, 
      last_name: request.body.last_name, 
      password:request.body.password
    })
  
    return response.status(201).json(newUser)

  } catch(error) {
    return response.status(400).json({'error': error.errors[0].message})
  }
})

module.exports = usersRouter