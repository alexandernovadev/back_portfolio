import Joi from '@hapi/joi'

const movieIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
const movieTitleSchema = Joi.string().max(80)
const movieYearSchema = Joi.number()
  .min(1888)
  .max(2077)
const movieCoverSchema = Joi.string().uri()
const movieDescriptionSchema = Joi.string().max(2000)
const movieDurationSchema = Joi.number()
  .min(1)
  .max(1000)
const movieContentRatingSchema = Joi.string().max(5)
const movieSourceSchema = Joi.string().uri()
const movieTagsSchema = Joi.array().items(Joi.string().max(50))


const movieIdSchemaObject = Joi.object({
  movieId: Joi.string().required()
})

const createMovieSchema = Joi.object({
  title: movieTitleSchema.required(),
  year: movieYearSchema.required(),
  cover: movieCoverSchema.required(),
  description: movieDescriptionSchema.required(),
  duration: movieDurationSchema.required(),
  contentRating: movieContentRatingSchema.required(),
  source: movieSourceSchema.required(),
  tags: movieTagsSchema
})

const updateMovieSchema = Joi.object({
  title: movieTitleSchema,
  year: movieYearSchema,
  cover: movieCoverSchema,
  description: movieDescriptionSchema,
  duration: movieDurationSchema,
  contentRating: movieContentRatingSchema,
  source: movieSourceSchema,
  tags: movieTagsSchema
})

export { movieIdSchema, createMovieSchema, updateMovieSchema,movieIdSchemaObject }
