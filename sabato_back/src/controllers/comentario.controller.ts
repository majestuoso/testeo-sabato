import { Request, Response } from 'express';
import commentService from '../services/comment.service.js';

export const obtenerComentariosPorLibro = async (req: Request, res: Response) => {
    try {
        const { libro_id } = req.params;
        const comentarios = await commentService.obtenerPorLibro(libro_id);
        res.json(comentarios);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const crearComentario = async (req: Request, res: Response) => {
    try {
        const { usuario_id, libro_id, contenido } = req.body;
        const comentario = await commentService.crear(usuario_id, libro_id, contenido);
        res.status(201).json(comentario);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarComentario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { usuario_id } = req.body;
        await commentService.eliminar(id, usuario_id);
        res.json({ mensaje: 'Comentario eliminado' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};