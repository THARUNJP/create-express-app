import { Request, Response, NextFunction } from 'express';
import { healthService } from './health.service';
import { HTTP_STATUS } from '../../lib/constants';
import { HealthQuery } from '../../types/index.d';

type HealthRequest = Request<{}, {}, {}, HealthQuery>;

export class HealthController {
  check(req: HealthRequest, res: Response, next: NextFunction): void {
    try {
      const verbose = req.query.verbose === (true as unknown as boolean);
      const data = verbose ? healthService.getDetailed() : healthService.getBasic();
      res.status(HTTP_STATUS.OK).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}

export const healthController = new HealthController();
