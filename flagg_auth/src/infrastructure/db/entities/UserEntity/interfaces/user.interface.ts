import { Types } from 'mongoose'
import { MetaData } from '../../../../../core/entities/UserEntity/user.entity'

export interface UserInterface {
  username: string
  password: string
  role: Types.ObjectId
  metaData: MetaData
}
