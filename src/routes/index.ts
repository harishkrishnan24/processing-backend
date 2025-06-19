import { Router } from 'express';
import v1Routes from './v1';

const router = Router();

// API versioning
router.use('/v1', v1Routes);

// Default route
router.get('/', (req, res) => {
  res.json({
    message: 'Processing Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/v1',
    },
  });
});

export default router;
