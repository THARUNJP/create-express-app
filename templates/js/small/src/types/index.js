/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {*} [data]
 * @property {string} [message]
 * @property {string[]} [errors]
 */

/**
 * @typedef {Object} PaginationParams
 * @property {number} page
 * @property {number} limit
 * @property {number} offset
 */

/**
 * @typedef {Object} HealthStatus
 * @property {string} status       - 'ok' | 'degraded' | 'down'
 * @property {string} environment
 * @property {string} timestamp
 * @property {number} uptimeSeconds
 * @property {{ heapUsed: number, heapTotal: number, rss: number }} memory
 */

export {};
