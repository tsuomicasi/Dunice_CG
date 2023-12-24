import mongoose from 'mongoose'

export class MongoClient {
  public bootstrap = async (connectLink: string) => {
    await mongoose.connect(connectLink).then(() => console.log('Database has been started'))
  }
}
