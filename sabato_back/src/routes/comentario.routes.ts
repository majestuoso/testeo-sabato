import { Router } from 'express';
import { obtenerComentariosPorLibro, crearComentario, eliminarComentario } from '../controllers/comentario.controller.js';

const router = Router();

router.get('/libro/:libro_id', obtenerComentariosPorLibro);
router.post('/', crearComentario);
router.delete('/:id', eliminarComentario);

export default router;