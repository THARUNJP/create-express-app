import { healthService } from './health.service.js';
import { HTTP_STATUS } from '../../lib/constants.js';

export class HealthController {
  /**
   * GET /health
   * GET /health?verbose=true
   *
   * @type {import('express').RequestHandler}
   */
  check(req, res, next) {
    try {
      const verbose = req.query.verbose === 'true';
      const data = verbose ? healthService.getDetailed() : healthService.getBasic();
      res.status(HTTP_STATUS.OK).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}

export const healthController = new HealthController();
