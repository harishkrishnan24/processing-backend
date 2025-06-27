import { Router } from 'express';
import { StreamController } from './../../controllers/streams-controller';

const router = Router();

// GET /api/v1/streams
router.get('/', StreamController.getAllStreams);

// GET /api/v1/streams/:id
router.get('/:id', StreamController.getStreamById);

// POST /api/v1/streams
router.post('/', StreamController.createStream);

// UPDATE /api/v1/streams/:id
router.put('/:id', StreamController.updateStream);

// DELETE /api/v1/streams/:id
router.delete('/:id', StreamController.deleteStream);

export default router;
