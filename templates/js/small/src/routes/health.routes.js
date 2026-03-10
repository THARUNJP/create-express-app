import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller.js';
import { validate, healthQuerySchema } from '../validators/health.validator.js';

const router = Router();

// GET /health?verbose=true
router.get('/', validate(healthQuerySchema, 'query'), healthCheck);

export default router;
