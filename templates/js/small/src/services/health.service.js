import { env } from '../config/env.js';

const startedAt = Date.now();

/**
 * Returns a basic health snapshot.
 * @returns {{ status: string, environment: string, timestamp: string, uptimeSeconds: number }}
 */
export function getBasicHealth() {
  return {
    status: 'ok',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
  };
}

/**
 * Returns an extended health snapshot including memory usage.
 * @returns {import('../types/index.js').HealthStatus & { memory: object, checks: object }}
 */
export function getDetailedHealth() {
  const mem = process.memoryUsage();

  return {
    ...getBasicHealth(),
    memory: {
      heapUsed: formatBytes(mem.heapUsed),
      heapTotal: formatBytes(mem.heapTotal),
      rss: formatBytes(mem.rss),
    },
    checks: {
      // Add real dependency checks here (DB ping, cache, etc.)
      database: 'not configured',
      cache: 'not configured',
    },
  };
}

/** @param {number} bytes */
function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
