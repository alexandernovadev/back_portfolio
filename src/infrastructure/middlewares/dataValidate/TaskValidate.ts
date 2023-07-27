import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const valueStatus = ['pending', 'in-progress', 'finished']

const taskSchema = Joi.object({
  description: Joi.string().required().messages({
    'string.base': '"description" should be a type of string',
    'any.required': '"description" is a required field',
  }),
  createdAt: Joi.number()
    .integer()
    .min(0)
    .custom((value, helpers) => {
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        return helpers.error('any.invalid')
      }
      return value
    }, 'Unix timestamp validation')
    .messages({
      'number.base': '"createdAt" should be a type of number',
      'number.integer': '"createdAt" should be an integer',
      'number.min': '"createdAt" should be positive',
      'any.invalid': '"createdAt" must be a valid Unix timestamp',
    }),

  status: Joi.string()
    .valid(...valueStatus)
    .default('pending')
    .messages({
      'string.base': '"status" should be a type of string',
      'any.only': `"status" must be one of [${valueStatus.join(', ')}]`,
    }),
})

export function validateTask(req: Request, res: Response, next: NextFunction) {
  const { error } = taskSchema.validate(req.body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  next()
}
