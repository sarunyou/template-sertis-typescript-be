import { Service } from 'typedi'
import { Controller } from '@sertis-chat-commerce/ts-toolkit/http-kit'

interface SystemUsage {
  timestamp: number,
  cpu: NodeJS.CpuUsage,
  memory: NodeJS.MemoryUsage,
  resource: NodeJS.ResourceUsage,
}

@Service()
export class ViewSystemUsageController extends Controller<Record<string, never>, SystemUsage> {
  protected handle(): void {
    this.status = 200
    this.response = {
      timestamp: Date.now(),
      cpu: process.cpuUsage(),
      memory: process.memoryUsage(),
      resource: process.resourceUsage(),
    }
  }
}
