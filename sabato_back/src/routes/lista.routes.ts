import { Router } from 'express';
import { obtenerListasPorUsuario, crearLista } from '../controllers/lista.controller.js';

const router = Router();

router.get('/:usuario_id', obtenerListasPorUsuario);
router.post('/', crearLista);

export default router;