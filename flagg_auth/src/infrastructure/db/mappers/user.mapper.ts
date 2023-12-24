import { UserDoc } from '../entities/UserEntity/user.entity'
import { UserEntity } from '../../../core/entities/UserEntity/user.entity'
import { RoleDoc } from '../entities/RoleEntity/role.entity'

export class UserMapper {
  public static toDomain = (entity: UserDoc, role: RoleDoc): UserEntity => {
    return new UserEntity(entity._id, entity.username, entity.password, role.name, entity.metaData)
  }
}
