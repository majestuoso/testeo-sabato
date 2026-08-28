import { Router } from 'express';
import medalController from '../controllers/medal.controller.js';

const router = Router();

router.get('/', medalController.obtenerTodas);
router.get('/:usuario_id', medalController.obtenerPorUsuario);
router.post('/', medalController.otorgarMedalla);

export default router;