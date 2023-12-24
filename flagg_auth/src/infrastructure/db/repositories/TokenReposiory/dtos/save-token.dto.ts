export class SaveTokenDto {
  constructor(
    readonly userId: string,
    readonly refreshToken: string,
    readonly ua: string,
    readonly ip: string,
  ) {}
}
