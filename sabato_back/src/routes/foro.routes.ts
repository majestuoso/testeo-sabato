import { Router } from 'express';
import { obtenerPostsForo, obtenerPostPorId, crearPostForo } from '../controllers/foro.controller.js';

const router = Router();

router.get('/', obtenerPostsForo);
router.get('/:id', obtenerPostPorId);
router.post('/', crearPostForo);

export default router;