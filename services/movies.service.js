const MongoLib = require('../lib/mongo')
class MoviesService {
  constructor() {
    this.collection = 'movies'
    this.mongoDB = new MongoLib()
  }

  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } }

    const movies = await this.mongoDB.getAll(this.collection, query)
    return movies || []
  }

  async getMovie({ movieId }) {
    const movies = await this.mongoDB.get(this.collection, movieId)
    return movies || []
  }

  async createMovie({ movie }) {
    const movies = await this.mongoDB.create(this.collection, movie)
    return movies || []
  }

  async updateMovie({ movieId, movie } = {}) {
    const movies = await this.mongoDB.update(this.collection, movieId, movie)
    return movies || []
  }

  async deleteMovie({ movieId }) {
    const movies = await this.mongoDB.delete(this.collection, movieId)
    return movies || []
  }
}

module.exports = MoviesService
