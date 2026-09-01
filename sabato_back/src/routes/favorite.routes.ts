import { Router } from 'express';
import { 
  obtenerFavoritos, 
  agregarFavorito, 
  eliminarFavorito 
} from '../controllers/favorite.controller';

const router = Router();

// GET /api/v1/favoritos
router.get('/', obtenerFavoritos);

// GET /api/v1/favoritos/usuario/22 (Modificado)
router.get('/usuario/:usuario_id', obtenerFavoritos);

router.post('/', agregarFavorito);
router.delete('/', eliminarFavorito);

export default router;