import * as boom from '@hapi/boom'
import * as joi from '@hapi/joi'

function validate(
  data: any,
  schema: joi.Schema
): joi.ValidationError | undefined {
  const { error } = schema.validate(data)
  return error
}

function validationHandler(schema: joi.Schema, check: string = 'body') {
  return function(req: any, res: any, next: any) {
    const error = validate(req[check], schema)
    error ? next(boom.badRequest(error.message)) : next()
  }
}

export default validationHandler
