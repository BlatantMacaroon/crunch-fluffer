import { Router } from 'express';
import * as crunchController from '../controllers/crunchController.ts';

const router = Router();

router.get('/:id', crunchController.get);
router.get('/', crunchController.getByArgs);
router.post('/', crunchController.create);
//router.update('/', crunchController.update);
//router.delete('/', crunchController.delete);

export default router;