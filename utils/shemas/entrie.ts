import Joi from '@hapi/joi'

const entryIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
const entryDescriptionSchema = Joi.string().max(2000)
const entryCreatedAtSchema = Joi.number()
  .integer()
  .min(0)
const entryStatusSchema = Joi.string().valid(
  'pending',
  'completed',
  'in_progress'
)

const createEntrySchema = Joi.object({
  description: entryDescriptionSchema.required(),
  createdAt: entryCreatedAtSchema.required(),
  status: entryStatusSchema.required()
})

const updateEntrySchema = Joi.object({
  description: entryDescriptionSchema,
  createdAt: entryCreatedAtSchema,
  status: entryStatusSchema
})

export { entryIdSchema, createEntrySchema, updateEntrySchema }
