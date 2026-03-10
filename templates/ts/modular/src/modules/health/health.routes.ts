import { Router } from 'express';
import { healthController } from './health.controller';

const router = Router();

// GET /health           → basic status
// GET /health?verbose=true → detailed status + memory + dependency checks
router.get('/', healthController.check.bind(healthController));

export default router;
