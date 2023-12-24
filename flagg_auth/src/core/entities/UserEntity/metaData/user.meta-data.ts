import { TagEnum } from '../../RoleEntity/enums/tag.enum'

export class UserMetaData {
  constructor(
    readonly fullName?: string,
    readonly dateBirthday?: Date,
    readonly tags?: TagEnum[],
    readonly avatar?: string,
  ) {}
}
