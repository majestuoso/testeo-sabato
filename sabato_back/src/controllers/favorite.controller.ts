import { Request, Response } from 'express';
import favoriteService from '../services/favorite.service.js';

export const obtenerFavoritos = async (req: Request, res: Response) => {
    try {
        const { usuario_id } = req.params;
        const favoritos = await favoriteService.obtenerPorUsuario(usuario_id);
        res.json(favoritos);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const agregarFavorito = async (req: Request, res: Response) => {
    try {
        const { usuario_id, libro_id } = req.body;
        const favorito = await favoriteService.agregar(usuario_id, libro_id);
        res.status(201).json(favorito);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarFavorito = async (req: Request, res: Response) => {
    try {
        const { usuario_id, libro_id } = req.body;
        await favoriteService.eliminar(usuario_id, libro_id);
        res.json({ mensaje: 'Eliminado de favoritos' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};