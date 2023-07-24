import MongoLib from '../lib/mongo'

interface Entries {
  tags?: string[]
  entriesjiraId?: string
  entriesjira?: any
  entrie?: any
}

class EntriesjiraService {
  private collection: string
  private mongoDB: MongoLib

  constructor() {
    this.collection = 'entries'
    this.mongoDB = new MongoLib()
  }

  async getEntriesjira({ tags }: Entries) {
    const query = tags ? { tags: { $in: tags } } : {}

    const entriesjira = await this.mongoDB.getAll(this.collection, query)
    return entriesjira || []
  }

  async createEntriesjira({ entrie }: Entries) {
    const entriesjira = await this.mongoDB.create(this.collection, entrie)
    return entriesjira || []
  }

  async updateEntriesjira({
    entriesjiraId = '',
    entriesjira = {}
  }: {
    entriesjiraId?: string
    entriesjira?: object
  }) {
    const newentriesjira = await this.mongoDB.update(
      this.collection,
      entriesjiraId,
      entriesjira
    )
    return newentriesjira || []
  }

  async deleteEntriesjira({ entriesjiraId = '' }: { entriesjiraId?: string }) {
    const entriesjira = await this.mongoDB.delete(
      this.collection,
      entriesjiraId
    )
    return entriesjira || []
  }
}

export default EntriesjiraService
