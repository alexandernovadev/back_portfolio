const express = require('express')
const app = express()

app.use(express.json())

// Cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

// Home Index

//* ***********/
// EndPoints
const moviesApi = require('./routes/movies.routes')
moviesApi(app)

const entriesApi = require('./routes/entriesjira')
entriesApi(app)



//* ***********/
// Midlewares
const {
  logErrors,
  errorHandler,
  wrapError
} = require('./utils/middleware/errorHandlers.js')

const notFoundHandler = require('./utils/middleware/notFoundHandler')
const { config } = require('./config/index')
app.use(logErrors)
app.use(wrapError)
app.use(errorHandler)
app.use(notFoundHandler)

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`)
})
