import { Request, Response } from "express";
import * as HealthService from "../services/health.service";
import { HTTP_STATUS } from "../lib/constants";
export async function healthz(_req: Request, res: Response): Promise<Response> {
  try {
    const health = HealthService.healthCheck();
    return res.status(HTTP_STATUS.OK).json(health);
  } catch (error: unknown) {
    return res.status(503).json({
      status: "error",
      message: "Service unavailable",
      timestamp: new Date().toISOString(),
    });
  }
}
