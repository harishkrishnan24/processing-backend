import { Router } from 'express';
import processingRoutes from './processing';

const router = Router();

// Route modules
router.use('/processing', processingRoutes);

// Health check for v1 API
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    version: 'v1',
    timestamp: new Date().toISOString()
  });
});

export default router;
