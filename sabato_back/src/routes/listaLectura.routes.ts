import { Router } from 'express';
import { obtenerListaLectura, agregarListaDocente } from '../controllers/listaLectura.controller.js';

const router = Router();

router.get('/:docente_id', obtenerListaLectura);
router.post('/', agregarListaDocente);

export default router;