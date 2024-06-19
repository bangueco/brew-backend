const productsRouter = require('express').Router()
const Drink = require('../models/drink')

productsRouter.get('/', async (request, response) => {
  const products = await Drink.findAll()
  return response.status(200).json(products)
})

productsRouter.get('/:id', async (request, response) => {
  const product = await Drink.findByPk(request.params.id)
  return response.status(200).json(product)
})

productsRouter.post('/', async (request, response, next) => {

  try {
    
    let {name, price} = request.body
  
    const newDrink = await Drink.create({
      name, price
    })
  
    return response.status(201).json(newDrink)

  } catch(error) {
    next(error)
  }

})

module.exports = productsRouter