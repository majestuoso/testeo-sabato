import { Router } from 'express';
import listaController from '../controllers/lista.controller.js';

const router = Router();

router.get('/', listaController.obtenerTodas);
router.get('/:id', listaController.obtenerPorId);
router.post('/', listaController.crear);
router.delete('/:id', listaController.eliminar);

export default router;