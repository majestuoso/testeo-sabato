import { Router } from 'express';
import opinionController from '../controllers/opinion.controller.js';

const router = Router();

router.get('/:libro_id', opinionController.obtenerPorLibro);
router.post('/', opinionController.crear);
router.delete('/:id', opinionController.eliminar);

export default router;