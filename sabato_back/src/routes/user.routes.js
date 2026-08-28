import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const router = Router();

router.get('/', userController.obtenerTodos);
router.get('/:id', userController.obtenerPorId);
router.put('/:id', userController.actualizar);
router.delete('/:id', userController.eliminar);

export default router;