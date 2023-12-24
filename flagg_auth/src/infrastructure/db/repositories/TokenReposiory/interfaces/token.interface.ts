import { JwtPayload } from 'jsonwebtoken'
import { SaveTokenDto } from '../dtos/save-token.dto'
import { TokenDoc } from '../../../entities/TokenEntity/token.entity'
import { GenerateTokensResult } from '../dtos/generate-tokens-result.dto'

export interface TokenRepository {
  generateTokens(payload: object): GenerateTokensResult
  validateAccessToken(accessToken: string): string | JwtPayload
  saveToken(saveTokenDto: SaveTokenDto): Promise<void>
  removeToken(refreshToken: string): Promise<void>
  findToken(refreshToken: string): Promise<TokenDoc>
}
