import { UserEntity } from '../../entities/UserEntity/user.entity'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { RefreshDto } from './dto/refresh.dto'
import { RefreshResultDto } from './dto/refresh-result.dto'

export interface UserRepository {
  signIn(signInDto: SignInDto): Promise<RefreshResultDto>
  signUp(signUpDto: SignUpDto): Promise<RefreshResultDto>
  logout(refreshToken: string): Promise<void>
  refresh(refreshDto: RefreshDto): Promise<RefreshResultDto>
  getAllUser(): Promise<UserEntity[]>
  getUser(userId: string): Promise<UserEntity>
  editInfo<T>(userId: string, editInfoDto: T): Promise<void>
  deleteUser(userId: string): Promise<void>
}
