import { Router } from 'express';
import { obtenerOpinionesPorLibro, crearOpinion } from '../controllers/opinion.controller.js';

const router = Router();

router.get('/libro/:libro_id', obtenerOpinionesPorLibro);
router.post('/', crearOpinion);

export default router;