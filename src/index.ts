import express, { Request, Response, NextFunction, Application } from 'express'
import moviesApi from '../routes/movies.routes'
import entriesApi from '../routes/entriesjira'
import {
  logErrors,
  errorHandler,
  wrapErrors
} from '../utils/middleware/errorHandlers'
import notFoundHandler from '../utils/middleware/notFoundHandler'
import { config } from '../config/index'

const app: Application = express()

app.use(express.json())

// Cors
app.use((req: Request, res: Response, next: NextFunction) => {
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


// EndPoints
moviesApi(app)
entriesApi(app)

// Middlewares
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)
app.use(notFoundHandler)

app.listen(config.port, function() {
  console.log(`\nListening http://localhost:${config.port} \n\n\n`)
})
