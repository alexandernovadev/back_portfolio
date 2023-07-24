import express, { Request, Response, NextFunction } from 'express'
import EntriesjiraService from '../services/entriesJira'
import cacheResponse from '../utils/cacheResponse'
import { FIVE_MINUTES_IN_SECONDS } from '../utils/time'
import { createEntrySchema } from '../utils/shemas/entrie'
import validationHandler from '../utils/middleware/validationHandler'

const entriesApi = (app: express.Application) => {
  const router = express.Router()
  app.use('/api/entriesjira', router)

  const entriesjiraService = new EntriesjiraService()

  router.get('/', async function(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS)

    const { tags } = req.query
    try {
      const entries_jira = await entriesjiraService.getEntriesjira({
        tags: tags as string[]
      })

      res.status(200).json({
        data: entries_jira,
        message: 'Entries Jira Listed'
      })
    } catch (err) {
      next(err)
    }
  })

  router.post('/', validationHandler(createEntrySchema), async function(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { body: entrie } = req

    console.log('entrie', entrie)
    try {
      const createdentrieId = await entriesjiraService.createEntriesjira({
        entrie
      })

      res.status(201).json({
        data: 'createdentrieId',
        message: 'Entrie created'
      })
    } catch (err) {
      next(err)
    }
  })
}

export default entriesApi
