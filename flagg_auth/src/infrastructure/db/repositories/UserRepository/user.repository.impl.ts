import { compare, hash } from 'bcrypt'
import { TokenRepositoryImpl } from '../TokenReposiory/token.repository.impl'
import { RoleSchema } from '../../entities/RoleEntity/role.entity'
import { UserSchema } from '../../entities/UserEntity/user.entity'
import { UserMapper } from '../../mappers/user.mapper'
import { UserEntity } from '../../../../core/entities/UserEntity/user.entity'
import { SignInDto } from '../../../../core/repositories/UserRepository/dto/sign-in.dto'
import { SignUpDto } from '../../../../core/repositories/UserRepository/dto/sign-up.dto'
import { RefreshDto } from '../../../../core/repositories/UserRepository/dto/refresh.dto'
import { UserRepository } from '../../../../core/repositories/UserRepository/user.repository'
import { RefreshResultDto, RefreshUserDto } from '../../../../core/repositories/UserRepository/dto/refresh-result.dto'

export class UserRepositoryImpl implements UserRepository {
  private readonly userRepository = UserSchema
  private readonly roleRepository = RoleSchema

  public signIn = async (signInDto: SignInDto): Promise<RefreshResultDto> => {
    const user = await this.userRepository.findOne({ username: signInDto.username })
    if (!user) {
      throw Error('Пользователь не найден')
      //throw ApiError.BadRequest('Пользователь с таким username не найден')
    }
    const comparePassword = await compare(signInDto.password, user.password)
    if (!comparePassword) {
      throw Error('Неверные данные при входе')
      //throw ApiError.BadRequest('Неверные данные при входе')
    }
    const { name } = await this.roleRepository.findById(user.role)
    return await this.responseData(
      { id: user._id.toString(), username: user.username, role: name },
      signInDto.details.ua,
      signInDto.details.ip,
    )
  }
  public signUp = async (signUpDto: SignUpDto): Promise<RefreshResultDto> => {
    const candidate = await this.userRepository.findOne({ username: signUpDto.username })
    if (candidate) {
      throw Error('Пользователь уже существует')
      //throw ApiError.BadRequest('Пользователь с таким username уже существует')
    }
    const hashedPassword = await hash(signUpDto.password, 4)
    const user = await this.userRepository.create({ ...signUpDto, password: hashedPassword })
    const { name } = await this.roleRepository.findById(user.role)

    return await this.responseData(
      { id: user._id.toString(), username: user.username, role: name },
      signUpDto.details.ua,
      signUpDto.details.ip,
    )
  }
  public logout = async (refreshToken: string): Promise<void> => {
    return await new TokenRepositoryImpl().removeToken(refreshToken)
  }

  public refresh = async (refreshDto: RefreshDto): Promise<RefreshResultDto> => {
    if (!refreshDto.refreshToken) {
      throw 'Пользователь не авторизован'
      //throw ApiError.UnauthorizedError()
    }
    const userData = new TokenRepositoryImpl().validateRefreshToken(refreshDto.refreshToken)
    const tokenFromDB = await new TokenRepositoryImpl().findToken(refreshDto.refreshToken)
    if (!userData || !tokenFromDB) {
      throw 'Пользователь не авторизован'
      //throw ApiError.UnauthorizedError()
    }
    const user = await this.userRepository.findById(userData['id'])
    const { name } = await this.roleRepository.findById(user.role)

    return await this.responseData(
      { id: user._id.toString(), username: user.username, role: name },
      refreshDto.details.ua,
      refreshDto.details.ip,
    )
  }

  private responseData = async (userData: RefreshUserDto, ua: string, ip: string): Promise<RefreshResultDto> => {
    const tokens = new TokenRepositoryImpl().generateTokens({ ...userData })
    await new TokenRepositoryImpl().saveToken({ userId: userData.id, refreshToken: tokens.refreshToken, ua, ip })

    return {
      ...tokens,
      user: userData,
    }
  }

  public getUser = async (userId: string): Promise<UserEntity> => {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw Error('Пользователь не найден')
    }
    const role = await this.roleRepository.findById(user.role)
    return UserMapper.toDomain(user, role)
  }
  public getAllUser = async (): Promise<UserEntity[]> => {
    const userList = await this.userRepository.find()
    return await Promise.all(
      userList.map(async (el) => UserMapper.toDomain(el, await this.roleRepository.findById(el.role))),
    )
  }
  public editInfo = async <T>(userId: string, editInfoDto: T): Promise<void> => {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw Error('Пользователь не найден')
    }
    user.metaData = { ...user.metaData, ...editInfoDto }
    await user.save()
  }
  public deleteUser = async (userId: string): Promise<void> => {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw Error('Пользователь не найден')
    }
    await user.deleteOne()
  }
}
