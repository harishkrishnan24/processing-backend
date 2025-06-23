import { PrismaClient } from './../generated/prisma';
import logger from './logger';

export const connectDatabase = async () => {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    logger.info('Database connection established successfully.');
  } catch (error) {
    logger.error('Error connecting to the database:', error);
    throw error;
  }

  return prisma;
};
