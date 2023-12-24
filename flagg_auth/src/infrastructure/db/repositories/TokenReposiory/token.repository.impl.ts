import jwt from 'jsonwebtoken'
import 'dotenv/config.js'
import { TokenSchema } from '../../entities/TokenEntity/token.entity'
import { TokenRepository } from './interfaces/token.interface'
import { SaveTokenDto } from './dtos/save-token.dto'
import { GenerateTokensResult } from './dtos/generate-tokens-result.dto'

export class TokenRepositoryImpl implements TokenRepository {
  private readonly tokenRepository = TokenSchema

  private readonly SECRET_ACCESS_JWT = process.env.SECRET_ACCESS_JWT
  private readonly SECRET_REFRESH_JWT = process.env.SECRET_REFRESH_JWT
  private readonly EXPIRES_IN_ACCESS = process.env.EXPIRES_IN_ACCESS
  private readonly EXPIRES_IN_REFRESH = process.env.EXPIRES_IN_REFRESH
  private readonly MAX_AGE_TOKEN = +process.env.MAX_AGE

  public generateTokens = (payload: object) => {
    const accessToken = jwt.sign(payload, this.SECRET_ACCESS_JWT, { expiresIn: this.EXPIRES_IN_ACCESS })
    const refreshToken = jwt.sign(payload, this.SECRET_REFRESH_JWT, { expiresIn: this.EXPIRES_IN_REFRESH })
    return new GenerateTokensResult(accessToken, refreshToken)
  }

  public validateAccessToken = (token: string) => {
    try {
      return jwt.verify(token, this.SECRET_ACCESS_JWT)
    } catch (err) {
      return null
    }
  }

  public validateRefreshToken = (token: string) => {
    try {
      return jwt.verify(token, this.SECRET_REFRESH_JWT)
    } catch (err) {
      return null
    }
  }

  public saveToken = async (saveTokenDto: SaveTokenDto) => {
    const EXPIRES_IN = Date.now() + this.MAX_AGE_TOKEN

    const tokenData = await this.tokenRepository.find({ userId: saveTokenDto.userId }, null, { sort: { createdAt: 1 } })

    if (tokenData.length == 5) {
      tokenData[4].refreshToken = saveTokenDto.refreshToken
      tokenData[4].ua = saveTokenDto.ua
      tokenData[4].ip = saveTokenDto.ip
      tokenData[4].expiresIn = EXPIRES_IN
      tokenData[4].createdAt = new Date()

      tokenData.map((el) => {
        this.removeToken(el.refreshToken)
      })

      await tokenData[4].save()
      return
    }

    await this.tokenRepository.create({ ...saveTokenDto, expiresIn: EXPIRES_IN, createdAt: new Date() })
  }

  public removeToken = async (refreshToken: string) => {
    await this.tokenRepository.deleteOne({ refreshToken })
  }

  public findToken = async (refreshToken: string) => {
    return this.tokenRepository.findOne({ refreshToken })
  }
}
