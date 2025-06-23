import dotenv from 'dotenv';
import { z } from 'zod';
import logger from './logger';

// Load environment variables from .env file
dotenv.config();

// Define the schema for environment variables
const envSchema = z.object({
  PORT: z
    .string()
    .regex(/^\d+$/, 'PORT should be a number')
    .transform(Number)
    .default('3000'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z
    .string()
    .url('DATABASE_URL must be a valid URL')
    .nonempty('DATABASE_URL is required'),
});

// Parse and validate environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  logger.error('Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

// Export the validated environment variables
export const env = parsedEnv.data;
