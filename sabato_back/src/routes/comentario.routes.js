import { Router } from 'express';
import comentarioController from '../controllers/comentario.controller.js';

const router = Router();

router.post('/', comentarioController.crear);
router.get('/:foro_id', comentarioController.obtenerPorForo);
router.delete('/:id', comentarioController.eliminar);

export default router;