import { TagEnum } from '../../RoleEntity/enums/tag.enum'

export class TourPlusMetaData {
  constructor(
    readonly name?: string,
    readonly tags?: TagEnum[],
    readonly avatar?: string,
    readonly description?: string,
    readonly schedule?: Schedule,
  ) {}
}

class Schedule {
  constructor(
    readonly monday: string,
    readonly tuesday: string,
    readonly wednesday: string,
    readonly thursday: string,
    readonly friday: string,
    readonly saturday: string,
    readonly sunday: string,
  ) {}
}
