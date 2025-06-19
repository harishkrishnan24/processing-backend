export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiVersion: process.env.API_VERSION || 'v1',
  corsOrigins: process.env.NODE_ENV === 'production' 
    ? (process.env.CORS_ORIGINS?.split(',') || ['https://yourdomain.com'])
    : ['http://localhost:3000', 'http://localhost:3001'],
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key'
  },
  database: {
    url: process.env.DATABASE_URL || ''
  }
};
