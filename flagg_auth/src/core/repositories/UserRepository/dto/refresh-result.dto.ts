import { RoleEnum } from '../../../entities/RoleEntity/enums/role.enum'

export class RefreshResultDto {
  constructor(
    readonly accessToken: string,
    readonly refreshToken: string,
    readonly user: RefreshUserDto,
  ) {}
}

export class RefreshUserDto {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly role: RoleEnum,
  ) {}
}
