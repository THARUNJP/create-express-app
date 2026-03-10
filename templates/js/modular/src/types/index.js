/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {*} [data]
 * @property {string} [message]
 * @property {string[]} [errors]
 */

/**
 * @typedef {Object} HealthBasic
 * @property {'ok'|'degraded'|'down'} status
 * @property {string} environment
 * @property {string} timestamp
 * @property {number} uptimeSeconds
 */

/**
 * @typedef {HealthBasic & { memory: { heapUsed: string, heapTotal: string, rss: string }, checks: Record<string, string> }} HealthDetailed
 */

export {};
