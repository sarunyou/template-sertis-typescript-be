import { ViewSystemUsageController } from '@apps/controller/view-system-usage'
import { Get } from '@sertis-chat-commerce/ts-toolkit/http-kit'

const MIN_IN_MS = 60000
export const apis = [
  Get({ path: '/health', domain: 'user' })
    .setChain(ViewSystemUsageController)
    .setLoggingOptions({ enable: true, duration: 15 * MIN_IN_MS }),
]
