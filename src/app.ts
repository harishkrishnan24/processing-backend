import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDatabase } from './config/database';

// Import routes
import { env } from './config/env';
import logger from './config/logger';
import { errorHandler } from './middleware/errorHandler';
import apiRoutes from './routes';

// Morgan + Winston integration
const stream = {
  write: (message: string) => logger.http(message.trim()),
};

// Only log HTTP requests in 'combined' format in prod, 'dev' in dev
const morganFormat = env.NODE_ENV === 'production' ? 'combined' : 'dev';

class App {
  public app: Express;
  private readonly port: string | number;

  constructor() {
    this.app = express();
    this.port = env.PORT;

    this.initializeMiddlewares();
    this.initializeDatabase();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());

    // CORS middleware
    this.app.use(
      cors({
        origin:
          env.NODE_ENV === 'production'
            ? ['https://yourdomain.com']
            : ['http://localhost:3000'],
        credentials: true,
      })
    );

    // Logging middleware
    this.app.use(morgan(morganFormat, { stream }));

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await connectDatabase();
    } catch (error) {
      logger.error('Exiting...', error);
      process.exit(1); // Exit the process if database connection fails
    }
  }

  private initializeRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    });

    // API routes
    this.app.use('/', apiRoutes);

    // 404 handler
    this.app.use('{*splat}', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: 'Route not found',
      });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`🚀 Server running on port ${this.port}`);
      logger.info(
        `📊 Health check available at http://localhost:${this.port}/health`
      );
      logger.info(`📚 API available at http://localhost:${this.port}/api`);
    });
  }
}

export default App;
