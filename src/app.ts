import './polyfill'
import { registerInstances } from '@apps/ioc/registry'
import { ExpressApp, HttpServer } from '@sertis-chat-commerce/ts-toolkit/http-kit'
import logger from '@sertis-chat-commerce/ts-toolkit/utils/logger'
import { apis } from '@apps/api'

apis.forEach((api) => ExpressApp.instance.registerRoute(api))

HttpServer.create(ExpressApp.instance.engine, logger)
  .setup({ port: parseInt(process.env['HTTP_PORT'] || '8080', 10) })
  .setLoaderFunction(async () => {
    await registerInstances()
  })
  .start()
  .catch((e) => logger.error(e))

process.on('beforeExit', (code) => {
  logger.error(`Process exited with code: ${code}`, { code })
})

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`, { err })
  process.exit(1)
})

process.on('SIGTERM', () => {
  logger.info(`Process ${process.pid} received a SIGTERM signal`)
  process.exit(0)
})

process.on('SIGINT', () => {
  logger.info(`Process ${process.pid} has been interrupted`)
  process.exit(0)
})

