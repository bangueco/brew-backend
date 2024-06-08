const productsRouter = require('express').Router()
const Drink = require('../models/drink')

productsRouter.get('/', async (request, response) => {
  const products = await Drink.findAll()
  return response.status(200).json({products})
})

module.exports = productsRouter