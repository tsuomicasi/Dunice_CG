import { AdminMetaData } from './metaData/admin.meta-data'
import { BusinessMetaData } from './metaData/business.meta-data'
import { UserMetaData } from './metaData/user.meta-data'
import { TourPlusMetaData } from './metaData/tour-plus.meta-data'
import { RoleEnum } from '../RoleEntity/enums/role.enum'

export type MetaData = AdminMetaData | BusinessMetaData | UserMetaData | TourPlusMetaData

export class UserEntity {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly password: string,
    readonly role: RoleEnum,
    readonly metaData: MetaData,
  ) {}
}
