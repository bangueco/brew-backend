const unknownEndPoint = (request, response) => {
  return response.status(404).json({error: 'Unknown endpoint'})
}

module.exports = {
  unknownEndPoint
}