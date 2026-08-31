import { Router } from 'express';
import { obtenerMedallas, obtenerMedallasUsuario, otorgarMedalla } from '../controllers/medal.controller.js';

const router = Router();

router.get('/', obtenerMedallas);
router.get('/usuario/:usuario_id', obtenerMedallasUsuario);
router.post('/otorgar', otorgarMedalla);

export default router;