import { SecurityConfig } from '@apps/guard/interfaces'
import { ContextDto, Controller, UnauthorizedException } from '@sertis-chat-commerce/ts-toolkit/http-kit'
import { createHmac } from 'crypto'
import { Service } from 'typedi'

@Service()
export class ApiKeyGuard extends Controller<ContextDto, ContextDto> {

  private config: SecurityConfig

  constructor(config: SecurityConfig) {
    super()
    this.config = config
  }

  protected handle(): void {
    const xApiKey = this.headers[ 'x-api-key' ] as string
    if (!(xApiKey && this.verifyXApiKey(xApiKey))) {
      throw new UnauthorizedException()
    }
  }

  private verifyXApiKey(xApiKey: string): boolean {
    const digest = createHmac(this.config.hashAlgorithm, this.config.serverSideKey).digest('hex')

    return digest === xApiKey
  }
}
