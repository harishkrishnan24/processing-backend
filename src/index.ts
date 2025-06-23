import App from './app';
import logger from './config/logger';

const app = new App();

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received');
  process.exit(0);
});

// Start the server
app.listen();
