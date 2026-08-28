import { Router } from 'express';
import foroController from '../controllers/foro.controller.js';

const router = Router();

router.get('/', foroController.obtenerTodos);
router.get('/:id', foroController.obtenerPorId);
router.post('/', foroController.crear);
router.delete('/:id', foroController.eliminar);

export default router;