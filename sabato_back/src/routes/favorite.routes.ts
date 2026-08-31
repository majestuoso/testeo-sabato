import { Router } from 'express';
import { obtenerFavoritos, agregarFavorito, eliminarFavorito } from '../controllers/favorite.controller.js';

const router = Router();

router.get('/:usuario_id', obtenerFavoritos);
router.post('/', agregarFavorito);
router.delete('/', eliminarFavorito);

export default router;