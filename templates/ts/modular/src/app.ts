import express, { Application } from 'express';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import healthRoutes from './modules/health/health.routes';

const app: Application = express();

// ── Core middleware ───────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Modules ───────────────────────────────────────────────────────────────────
app.use('/health', healthRoutes);

// ── Error handling (must be last) ─────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
