import { Types } from 'mongoose'

export interface TokenInterface {
  userId: Types.ObjectId
  refreshToken: string
  ua: string
  ip: string
  expiresIn: number
  createdAt: Date
}
