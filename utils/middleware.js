const unknownEndPoint = (request, response) => {
  return response.status(404).json({error: 'Unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).json({error: error.errors[0].message})
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({error: error.errors[0].message})
  }

  next()
}

module.exports = {
  unknownEndPoint,
  errorHandler
}