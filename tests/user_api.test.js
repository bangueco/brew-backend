const { test, describe, beforeEach } = require('node:test')
const assert = require('assert')
const helper = require('./helper')
const bcrypt = require('bcrypt')

const supertest = require('supertest')

const User = require('../models/user')

const app = require('../app')

const api = supertest(app)

describe('when there is one user in db', () => {
  beforeEach( async () => {
    await User.truncate()

    const passwordHash = await bcrypt.hash('werunthiscity', 10)

    await User.create({
      username: 'blanc900', 
      first_name:'Ban', 
      last_name: 'Gueco', 
      password: passwordHash
    })
  })
  test('creating new user succeeds', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'blanc9000',
      first_name: 'Ban',
      last_name: 'Gueco',
      password: 'werunthiscity'
    }

    await api.post('/api/register')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })
  test('creating another user with same username fails', async () => {
    const newUser = {
      username: 'blanc900',
      first_name: 'Ban',
      last_name: 'Gueco',
      password: 'werunthiscity'
    }

    await api.post('/api/register')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    const existingUsername = await helper.usersInDB()
    assert.strictEqual(existingUsername[0].username, newUser.username)
  })
})