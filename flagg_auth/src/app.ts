import express from 'express'
import { MongoClient } from './infrastructure/db'
import 'dotenv/config.js'

class App {
  private PORT: number = +process.env.PORT
  private MONGO_URL: string = process.env.MONGO_URL

  constructor(
    private readonly app = express(),
    private readonly mongoClient = new MongoClient(),
  ) {}

  public bootstrap = async () => {
    try {
      await this.mongoClient.bootstrap(this.MONGO_URL)
      this.app.listen(this.PORT, () => console.log(`Server has been started on ${this.PORT}`))
    } catch (err) {
      console.log(err)
    }
  }
}

const app = new App()

await app.bootstrap()
