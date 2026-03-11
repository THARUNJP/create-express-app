import express, { Application, Request, Response } from 'express';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes/health.routes';

const app: Application = express();

// ── Core middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ── API routes 
app.use('/api', routes);

// ── Error handling (must be last)
app.use(errorHandler);

export default app;
