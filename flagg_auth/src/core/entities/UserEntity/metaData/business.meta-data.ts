import { TagEnum } from '../../RoleEntity/enums/tag.enum'

export class BusinessMetaData {
  constructor(
    readonly name?: string,
    readonly tags?: TagEnum[],
    readonly avatar?: string,
  ) {}
}
