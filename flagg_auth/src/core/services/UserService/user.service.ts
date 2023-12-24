import { UserRepository } from '../../repositories/UserRepository/user.repository'
import { SignInDto } from '../../repositories/UserRepository/dto/sign-in.dto'
import { SignUpDto } from '../../repositories/UserRepository/dto/sign-up.dto'

export class UserService {
  constructor(private readonly userService: UserRepository) {}

  public signIn = (signInDto: SignInDto) => {
    return this.userService.signIn(signInDto)
  }

  public signUp = (signUpDto: SignUpDto) => {
    return this.userService.signUp(signUpDto)
  }

  public getAllUser = () => {
    return this.userService.getAllUser()
  }

  public getUser = (userId: string) => {
    return this.userService.getUser(userId)
  }

  public editInfo = <T>(userId: string, editInfoDto: T) => {
    return this.userService.editInfo(userId, editInfoDto)
  }

  public deleteUser = (userId: string) => {
    return this.userService.deleteUser(userId)
  }
}
