import { HttpClient } from '@sertis-chat-commerce/ts-toolkit/http-kit'
import { Token } from 'typedi'

export const PlatformApiClient = new Token<HttpClient>('platform.api')
export const CCMApiClient = new Token<HttpClient>('ccm.api')
