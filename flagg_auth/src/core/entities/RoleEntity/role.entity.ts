import { RoleEnum } from './enums/role.enum'

export class RoleEntity {
  constructor(
    readonly id: string,
    readonly name: RoleEnum,
  ) {}
}
