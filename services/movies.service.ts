import MongoLib from '../lib/mongo'

interface Query {
  tags?: { $in: string[] }
}

class MoviesService {
  private collection: string
  private mongoDB: MongoLib

  constructor() {
    this.collection = 'movies'
    this.mongoDB = new MongoLib()
  }

  async getMovies({ tags }: { tags?: string[] } = {}): Promise<any[]> {
    const query: Query = tags ? { tags: { $in: tags } } : {}
    const movies = await this.mongoDB.getAll(this.collection, query)
    return movies || []
  }

  async getMovie({ movieId }: { movieId?: string } = {}): Promise<any[]> {
    if (!movieId) {
      throw new Error('Movie ID is required')
    }

    const movies = await this.mongoDB.get(this.collection, movieId)
    return movies || []
  }

  async createMovie({ movie }: { movie: any }): Promise<any[]> {
    const movies = await this.mongoDB.create(this.collection, movie)
    return movies || []
  }

  async updateMovie(
    { movieId, movie }: { movieId?: string; movie?: any } = {
      movieId: undefined,
      movie: undefined
    }
  ): Promise<any[]> {
    if (!movieId || !movie) {
      throw new Error('Both movieId and movie are required parameters')
    }
    const movies = await this.mongoDB.update(this.collection, movieId, movie)
    return movies || []
  }

  throwError(message: string): never {
    throw new Error(message)
  }
  async deleteMovie({ movieId }: { movieId?: string } = {}): Promise<string> {
    if (!movieId) {
      throw new Error('movieId is a required parameter')
    }
    const movieIdDeleted = await this.mongoDB.delete(this.collection, movieId)
    return movieIdDeleted || this.throwError('No movie deleted')
  }
}

export default MoviesService
