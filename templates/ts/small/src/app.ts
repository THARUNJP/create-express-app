import express, { Application, Request, Response } from 'express';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import exampleRoutes from './routes/example.routes';

const app: Application = express();

// ── Core middleware ──────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api/examples', exampleRoutes);

// ── Error handling (must be last) ─────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
