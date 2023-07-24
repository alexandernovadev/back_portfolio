import express, { Request, Response, NextFunction } from 'express'
import MoviesService from '../services/movies.service'

import {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
  movieIdSchemaObject
} from '../utils/shemas/movies'

import validationHandler from '../utils/middleware/validationHandler'
import cacheResponse from '../utils/cacheResponse'
import {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} from '../utils/time'

const moviesApi = (app: express.Application) => {
  const router = express.Router()
  app.use('/api/movies', router)

  const moviesService = new MoviesService()

  router.get('/', async function(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS)

    const { tags } = req.query
    try {
      const movies = await moviesService.getMovies({ tags: tags as string[] })

      res.status(200).json({
        data: movies,
        message: 'Movies Listed'
      })
    } catch (err) {
      next(err)
    }
  })

  router.get(
    '/:movieId',
    validationHandler(movieIdSchemaObject, 'params'),
    async function(req: Request, res: Response, next: NextFunction) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)

      const { movieId } = req.params
      try {
        const movies = await moviesService.getMovie({ movieId })

        res.status(200).json({
          data: movies,
          message: 'movie retrieved'
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post('/', validationHandler(createMovieSchema), async function(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { body: movie } = req
    try {
      const createdMovieId = await moviesService.createMovie({ movie })

      res.status(201).json({
        data: createdMovieId,
        message: 'movie created'
      })
    } catch (err) {
      next(err)
    }
  })

  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async function(req: Request, res: Response, next: NextFunction) {
      const { movieId } = req.params
      const { body: movie } = req

      try {
        const updatedMovieId = await moviesService.updateMovie({
          movieId,
          movie
        })

        res.status(200).json({
          data: updatedMovieId,
          message: 'movie updated'
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function(req: Request, res: Response, next: NextFunction) {
      const { movieId } = req.params

      try {
        const deletedMovieId = await moviesService.deleteMovie({ movieId })

        res.status(200).json({
          data: deletedMovieId,
          message: 'movie deleted'
        })
      } catch (err) {
        next(err)
      }
    }
  )
}

export default moviesApi
