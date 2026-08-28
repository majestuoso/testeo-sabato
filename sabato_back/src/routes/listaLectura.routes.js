import { Router } from 'express';
import listaLecturaController from '../controllers/listaLectura.controller.js';

const router = Router();

router.get('/:docente_id', listaLecturaController.obtenerPorDocente);
router.post('/', listaLecturaController.crear);
router.delete('/:lista_id/:docente_id', listaLecturaController.eliminar);

export default router;