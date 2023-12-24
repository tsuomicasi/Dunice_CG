import { Document, model, Schema } from 'mongoose'
import { RoleInterface } from './interfaces/role.interface'
import { RoleEnum } from '../../../../core/entities/RoleEntity/enums/role.enum'

export type RoleDoc = Document<any, any, RoleInterface> & RoleInterface

const schema = new Schema<RoleInterface>({
  name: { type: String, enum: Object.values(RoleEnum), unique: true, required: true },
})

export const RoleSchema = model<RoleInterface>('Role', schema)
