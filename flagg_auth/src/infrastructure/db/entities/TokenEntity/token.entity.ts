import { Document, model, Schema } from 'mongoose'
import { TokenInterface } from './interfaces/token.interface'

export type TokenDoc = Document<any, any, TokenInterface> & TokenInterface

const schema = new Schema<TokenInterface>({
  userId: { type: Schema.Types.ObjectId, required: true },
  refreshToken: { type: String, required: true },
  ua: { type: String, required: true },
  ip: { type: String, required: true },
  expiresIn: { type: Number, required: true },
  createdAt: { type: Date, required: true },
})

export const TokenSchema = model<TokenInterface>('Token', schema)
