import app from './app';
import { env } from './config/env';

const server = app.listen(env.PORT, () => {
  console.log(`[server] Running in ${env.NODE_ENV} mode on http://localhost:${env.PORT}`);
  console.log(`[server] Health       → http://localhost:${env.PORT}/health`);
  console.log(`[server] Health (verbose) → http://localhost:${env.PORT}/health?verbose=true`);
});

const shutdown = (signal: string): void => {
  console.log(`[server] ${signal} received — shutting down gracefully`);
  server.close(() => {
    console.log('[server] Closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default server;
