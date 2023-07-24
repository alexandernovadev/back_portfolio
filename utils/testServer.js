const express = require('express')
const supertest = require('supertest')

// Only to testing create a server
function testServer (route) {
  const app = express()
  route(app)

  return supertest(app)
}

module.exports = testServer
