import { Service } from 'typedi'
import { JWTConfig } from '@cores/user/utils/interfaces'
import { PlainObject } from '@sertis-chat-commerce/ts-toolkit/utils/common-types'
import jwt from 'jsonwebtoken'
import { UnauthorizedException } from '@sertis-chat-commerce/ts-toolkit'

@Service()
export class JWTService {
  #config: JWTConfig

  constructor(config: JWTConfig) {
    this.#config = config
  }

  public verify(token: string): PlainObject {
    try {
      return jwt.verify(token, this.#config.secret) as PlainObject
    } catch (error) {
      throw new UnauthorizedException().withInput({ token })
    }
  }
}
