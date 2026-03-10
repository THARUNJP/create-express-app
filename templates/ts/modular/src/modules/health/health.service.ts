import { env } from '../../config/env';
import { HealthBasic, HealthDetailed } from '../../types/index.d';

const startedAt = Date.now();

function formatBytes(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export class HealthService {
  getBasic(): HealthBasic {
    return {
      status: 'ok',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
    };
  }

  getDetailed(): HealthDetailed {
    const mem = process.memoryUsage();

    return {
      ...this.getBasic(),
      memory: {
        heapUsed: formatBytes(mem.heapUsed),
        heapTotal: formatBytes(mem.heapTotal),
        rss: formatBytes(mem.rss),
      },
      checks: {
        // Extend with real DB/cache pings as needed
        database: 'not configured',
        cache: 'not configured',
      },
    };
  }
}

export const healthService = new HealthService();
