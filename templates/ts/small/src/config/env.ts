import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['NODE_ENV', 'PORT'] as const;

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
  PORT: parseInt(process.env.PORT ?? '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? 'changeme',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
  LOG_LEVEL: process.env.LOG_LEVEL ?? 'info',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
};
