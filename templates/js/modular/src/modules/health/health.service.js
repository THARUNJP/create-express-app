import { env } from '../../config/env.js';

const startedAt = Date.now();

/** @param {number} bytes @returns {string} */
function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export class HealthService {
  /** @returns {import('../../types/index.js').HealthBasic} */
  getBasic() {
    return {
      status: 'ok',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
    };
  }

  /** @returns {import('../../types/index.js').HealthDetailed} */
  getDetailed() {
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
