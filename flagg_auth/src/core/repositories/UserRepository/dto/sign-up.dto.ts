import { RoleEnum } from '../../../entities/RoleEntity/enums/role.enum'
import { MetaData } from '../../../entities/UserEntity/user.entity'
import { DetailDto } from './detail.dto'

export class SignUpDto {
  constructor(
    readonly username: string,
    readonly password: string,
    readonly role: RoleEnum,
    readonly metaData: MetaData,
    readonly details: DetailDto,
  ) {}
}
