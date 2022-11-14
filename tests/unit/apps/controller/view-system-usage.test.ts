import { ViewSystemUsageController } from '@apps/controller/view-system-usage'
import { getEmptyContext } from '@sertis-chat-commerce/ts-toolkit/http-kit'

describe('View System Usage Controller', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern')
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should respond 200 with system usage info from NodeJS', async () => {
    jest.spyOn(process, 'cpuUsage').mockReturnValue({ k: 'cpu-value' } as unknown as NodeJS.CpuUsage)
    jest.spyOn(process, 'memoryUsage').mockReturnValue({ k: 'memory-value' } as unknown as NodeJS.MemoryUsage)
    jest.spyOn(process, 'resourceUsage').mockReturnValue({ k: 'resource-value' } as unknown as NodeJS.ResourceUsage)
    const expectedResponse = {
      timestamp: Date.now(),
      cpu: { k: 'cpu-value' },
      memory: { k: 'memory-value' },
      resource: { k: 'resource-value' },
    }
    const expectedContext = { ...getEmptyContext(), status: 200, response: expectedResponse }

    const controller = new ViewSystemUsageController().setContext(getEmptyContext())
    await controller.invoke()

    expect(controller.context).toStrictEqual(expectedContext)
  })
})
