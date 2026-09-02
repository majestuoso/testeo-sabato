// controllers/favorite.controller.ts
import { Request, Response } from 'express';
import favoriteService from '../services/favorite.service';

// Interfaz para extender Request cuando usas middleware de autenticación
interface AuthenticatedRequest extends Request {
  user?: {
    usuario_id?: number | string;
    id?: number | string;
  };
}

export const obtenerFavoritos = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const usuarioId = Array.isArray(req.params.usuario_id)
      ? req.params.usuario_id[0]
      : req.params.usuario_id || req.user?.usuario_id || req.user?.id;

    if (!usuarioId) {
      return res.status(400).json({ error: 'Falta el ID del usuario' });
    }

    const favoritos = await favoriteService.obtenerPorUsuario(usuarioId);
    return res.status(200).json(favoritos || []);
  } catch (error: any) {
    console.error('Error en obtenerFavoritos:', error.message);
    return res.status(500).json({ error: 'Error interno al obtener favoritos' });
  }
};

export const agregarFavorito = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const usuarioId = req.user?.usuario_id || req.user?.id || req.body.usuario_id;
    const { libro_id } = req.body;

    if (!usuarioId || !libro_id) {
      return res.status(400).json({ error: 'Faltan datos (usuario_id, libro_id)' });
    }

    const nuevoFavorito = await favoriteService.agregar(usuarioId, libro_id);
    return res.status(201).json(nuevoFavorito);
  } catch (error: any) {
    console.error('Error en agregarFavorito:', error.message);
    return res.status(500).json({ error: 'Error interno al agregar favorito' });
  }
};

export const eliminarFavorito = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const usuarioId = req.user?.usuario_id || req.user?.id || req.body.usuario_id || req.params.usuario_id;
    const libroId = req.body.libro_id || req.params.libro_id;

    if (!usuarioId || !libroId) {
      return res.status(400).json({ error: 'Faltan datos (usuario_id, libro_id)' });
    }

    const resultado = await favoriteService.eliminar(usuarioId, libroId);
    return res.status(200).json({ mensaje: 'Favorito eliminado con éxito', resultado });
  } catch (error: any) {
    console.error('Error en eliminarFavorito:', error.message);
    return res.status(500).json({ error: 'Error interno al eliminar favorito' });
  }
};