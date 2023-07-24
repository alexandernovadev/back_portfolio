import { MongoClient, ObjectId } from 'mongodb'
import { config } from '../config'

const USER = encodeURIComponent(config.dbUser || '')
const PASSWORD = encodeURIComponent(config.dbPassword || '')
const DB_NAME = config.dbName || ''

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
  client: MongoClient
  dbName: string
  static connection: Promise<any>

  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.dbName = DB_NAME
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err)
          }

          console.log('Connected succesfully to mongo')
          resolve(this.client.db(this.dbName))
        })
      })
    }

    return MongoLib.connection
  }

  getAll(collection: string, query: object) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray()
    })
  }

  get(collection: string, id: string) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: new ObjectId(id) })
    })
  }

  create(collection: string, data: object) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data)
      })
      .then(result => result.insertedId)
  }

  update(collection: string, id: string, data: object) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne(
            { _id: new ObjectId(id) },
            { $set: data },
            { upsert: true }
          )
      })
      .then(result => result.upsertedId || id)
  }

  delete(collection: string, id: string) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({ _id: new ObjectId(id) })
      })
      .then(() => id)
  }
}

export default MongoLib
