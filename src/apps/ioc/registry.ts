import { ApiKeyGuard } from '@apps/guard/api-key'
import { SecurityConfig, securityDictionary } from '@apps/guard/interfaces'
import { CCMApiClient, PlatformApiClient } from '@apps/ioc/token'
import { CCMApi } from '@cores/user/external/ccm-api'
import {
  CCMConfig,
  ccmDictionary,
  PlatformConfig,
  platformDictionary,
  SendbirdConfig,
  sendbirdDictionary
} from '@cores/user/external/interfaces'
import { ConfigService, setupConfig } from '@sertis-chat-commerce/ts-toolkit/config'
import { AxiosHttpClient } from '@sertis-chat-commerce/ts-toolkit/http-kit'
import { setupSecretManager } from '@sertis-chat-commerce/ts-toolkit/secret'
import logger from '@sertis-chat-commerce/ts-toolkit/utils/logger'
import { UserApi } from '@cores/user/external/user-api'
import { JWTConfig, jwtDictionary } from '@cores/user/utils/interfaces'
import { JWTService } from '@libs/jwt'
import { Container } from 'typedi'
import { FirestoreEngine } from '@sertis-chat-commerce/ts-toolkit/db/engine/firestore/firestore'
import { JoiValidator } from '@sertis-chat-commerce/ts-toolkit/http-kit/app/validator/joi'
import Agent from 'agentkeepalive'

export async function registerInstances(): Promise<void> {
  const configService = await registerConfig()

  registerPlatform(configService)
  registerCCM(configService)
  registerApiKeyGuard(configService)
  registerJWTService(configService)
  registerCCMApi(configService)
  registerUserApi(configService)
  registerFirestore()
  registerValidator()
}

async function registerConfig(): Promise<ConfigService> {
  let localConfig = {}
  let additionConfig = {}

  if (
    process.env['APP_ENV'] === 'development'
    || process.env['APP_ENV'] === 'staging'
    || process.env['APP_ENV'] === 'production'
  ) {
    additionConfig = await setupSecretManager({
      gcpProjectId: process.env['GOOGLE_CLOUD_PROJECT'] ?? '',
      gcpSecretName: process.env['SECRET_NAME'] ?? '',
    })
  } else {
    logger.info(`setup local env APP_ENV=${process.env['APP_ENV']}`)
    localConfig = setupConfig()
  }

  const configService = new ConfigService({ ...localConfig, ...additionConfig })
  Container.set(ConfigService, configService)

  return configService
}

function registerApiKeyGuard(configService: ConfigService) {
  const config = configService.resolve<SecurityConfig>(securityDictionary)
  Container.set(ApiKeyGuard, new ApiKeyGuard(config))
}

function registerJWTService(configService: ConfigService) {
  const config = configService.resolve<JWTConfig>(jwtDictionary)
  Container.set(JWTService, new JWTService(config))
}

function registerCCMApi(configService: ConfigService) {
  const options = configService.resolve<CCMConfig>(ccmDictionary)
  Container.set(CCMApi, new CCMApi(Container.get(CCMApiClient), options))
}

function registerUserApi(configService: ConfigService) {
  const options = configService.resolve<SendbirdConfig>(sendbirdDictionary)
  Container.set(UserApi, new UserApi(Container.get(PlatformApiClient), options))
}

function registerPlatform(configService: ConfigService) {
  const { baseEndpoint, xApiKey } = configService.resolve<PlatformConfig>(platformDictionary)
  const platformHeaders = {
    'Content-Type': 'application/json',
    'x-api-key': xApiKey,
  }
  Container.set(PlatformApiClient, new AxiosHttpClient(baseEndpoint, 10000, platformHeaders, {
    httpAgent: new Agent(),
    httpsAgent: new Agent.HttpsAgent(),
  }))
}

function registerCCM(configService: ConfigService) {
  const { baseEndpoint, proxyToken } = configService.resolve<CCMConfig>(ccmDictionary)
  const platformHeaders = {
    'Content-Type': 'application/json',
    'proxy-token': proxyToken,
  }
  Container.set(CCMApiClient, new AxiosHttpClient(baseEndpoint, 10000, platformHeaders, {
    httpAgent: new Agent(),
    httpsAgent: new Agent.HttpsAgent(),
  }))
}

function registerFirestore() {
  Container.set(FirestoreEngine, new FirestoreEngine())
}

function registerValidator() {
  Container.set(JoiValidator, new JoiValidator())
}
