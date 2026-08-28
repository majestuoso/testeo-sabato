import { Router } from 'express';
import favoriteController from '../controllers/favorite.controller.js';

const router = Router();

// Ruta genérica o para listar todos/filtrar si se requiere
router.get('/', favoriteController.obtenerTodos || ((req, res) => res.json([])));
router.get('/:usuario_id', favoriteController.obtenerPorUsuario);
router.post('/', favoriteController.agregar);
router.delete('/:usuario_id/:libro_id', favoriteController.eliminar);

export default router;