export class GenerateTokensResult {
  constructor(
    readonly accessToken: string,
    readonly refreshToken: string,
  ) {}
}
