import { Router } from 'express';
import * as fluffController from '../controllers/fluffController.ts';

const router = Router();

//router.get('/:id', fluffController.get);
router.get('/', fluffController.getByArgs);
router.post('/:crunchId', fluffController.generate);
//router.delete('/', fluffController.delete);

export default router;