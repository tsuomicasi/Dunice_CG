import { RoleDoc } from '../entities/RoleEntity/role.entity'
import { RoleEntity } from '../../../core/entities/RoleEntity/role.entity'

export class RoleMapper {
  public static toDomain = (entity: RoleDoc): RoleEntity => {
    return new RoleEntity(entity._id, entity.name)
  }
}
