import { Router } from 'express';
import streamRoutes from './streams';

const router = Router();

// Route modules
router.use('/streams', streamRoutes);

export default router;
