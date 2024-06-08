const jwt = require('jsonwebtoken')

const unknownEndPoint = (request, response) => {
  return response.status(404).json({error: 'Unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).json({error: error.errors[0].message})
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({error: error.errors[0].message})
  } else if (error.name === 'Error') {
    return response.status(400).json({error: error.message})
  }

  next()
}

const authenticateToken = (request, response, next) => {
  const authHeader = request.get('Authorization')
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return response.status(401).json({error: 'invalid bearer token'})
  
  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) return response.status(403).json({error: 'invalid token'})
    request.user = user
    next()
  })
}

module.exports = {
  unknownEndPoint,
  errorHandler,
  authenticateToken
}