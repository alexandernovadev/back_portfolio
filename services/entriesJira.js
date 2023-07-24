const MongoLib = require('../lib/mongo')

class EntriesjiraService {
  constructor() {
    this.collection = 'entries'
    this.mongoDB = new MongoLib()
  }

  async getEntriesjira({ tags }) {
    const query = tags && { tags: { $in: tags } }

    const entriesjira = await this.mongoDB.getAll(this.collection, query)
    return entriesjira || []
  }

  async createEntriesjira({ entrie }) {
    const entriesjira = await this.mongoDB.create(this.collection, entrie)
    return entriesjira || []
  }

  async updateEntriesjira({ entriesjiraId, entriesjira } = {}) {
    const newentriesjira = await this.mongoDB.update(this.collection, entriesjiraId, entriesjira)
    return newentriesjira || []
  }

  async deleteEntriesjira({ entriesjiraId }) {
    const entriesjira = await this.mongoDB.delete(this.collection, entriesjiraId)
    return entriesjira || []
  }
}

module.exports = EntriesjiraService
