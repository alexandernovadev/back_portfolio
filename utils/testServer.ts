import express from 'express'
import supertest from 'supertest'

// Only to testing create a server
const testServer = (
  route: (app: express.Express) => void
): supertest.SuperTest<supertest.Test> => {
  const app = express()
  route(app)

  return supertest(app)
}

export default testServer
