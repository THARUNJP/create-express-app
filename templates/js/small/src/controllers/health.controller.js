import { getBasicHealth, getDetailedHealth } from '../services/health.service.js';
import { HTTP_STATUS } from '../lib/constants.js';

/**
 * GET /health
 * Returns basic status. Use ?verbose=true for extended info.
 *
 * @type {import('express').RequestHandler}
 */
export async function healthCheck(req, res, next) {
  try {
    const { verbose } = req.parsed ?? {};
    const data = verbose ? getDetailedHealth() : getBasicHealth();
    res.status(HTTP_STATUS.OK).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
