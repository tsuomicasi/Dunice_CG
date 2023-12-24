import { DetailDto } from './detail.dto'

export class RefreshDto {
  constructor(
    readonly refreshToken: string,
    readonly details: DetailDto,
  ) {}
}
