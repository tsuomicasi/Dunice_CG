import { Document, model, Schema } from 'mongoose'
import { UserInterface } from './interfaces/user.interface'

export type UserDoc = Document<any, any, UserInterface> & UserInterface

const schema = new Schema<UserInterface>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  metaData: { type: Schema.Types.Mixed, required: true },
})

export const UserSchema = model<UserInterface>('User', schema)
