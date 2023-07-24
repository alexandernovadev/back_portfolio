const joi = require('@hapi/joi')

const entryIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const entryDescriptionSchema = joi.string().max(2000)
const entryCreatedAtSchema = joi
  .number()
  .integer()
  .min(0)
const entryStatusSchema = joi
  .string()
  .valid('pending', 'completed', 'in_progress')

const createEntrySchema = joi.object({
  description: entryDescriptionSchema.required(),
  createdAt: entryCreatedAtSchema.required(),
  status: entryStatusSchema.required()
})

const updateEntrySchema = joi.object({
  description: entryDescriptionSchema,
  createdAt: entryCreatedAtSchema,
  status: entryStatusSchema
})

module.exports = {
  entryIdSchema,
  createEntrySchema,
  updateEntrySchema
}
