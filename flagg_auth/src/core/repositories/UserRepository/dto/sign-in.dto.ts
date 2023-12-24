import { DetailDto } from './detail.dto'

export class SignInDto {
  constructor(
    readonly username: string,
    readonly password: string,
    readonly details: DetailDto,
  ) {}
}
