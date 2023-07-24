const express = require('express')
const EntriesjiraService = require('../services/entriesJira')

const cacheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS } = require('../utils/time')

const { createEntrySchema } = require('../utils/shemas/entrie')

const validationHandler = require('../utils/middleware/validationHandler')

function entriesApi(app) {
  const router = express.Router()
  app.use('/api/entriesjira', router)

  const entriesjiraService = new EntriesjiraService()

  // Get Entries Jira
  router.get('/', async function(req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS)

    const { tags } = req.query
    try {
      const entries_jira = await entriesjiraService.getEntriesjira({ tags })

      res.status(200).json({
        data: entries_jira,
        message: 'Entries Jira Listed'
      })
    } catch (err) {
      next(err)
    }
  })

  // Save Entrie
  router.post('/', validationHandler(createEntrySchema), async function(
    req,
    res,
    next
  ) {
    const { body: entrie } = req

    console.log("entrie", entrie);
    try {
      const createdentrieId = await entriesjiraService.createEntriesjira({
        entrie
      })

      res.status(201).json({
        data: "createdentrieId",
        message: 'Entrie created'
      })
    } catch (err) {
      next(err)
    }
  })
}

module.exports = entriesApi
