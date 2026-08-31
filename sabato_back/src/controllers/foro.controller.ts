import { Request, Response } from 'express';
import foroService from '../services/foro.service.js';

export const obtenerPostsForo = async (_req: Request, res: Response) => {
    try {
        const posts = await foroService.obtenerTodos();
        res.json(posts);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerPostPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await foroService.obtenerPorId(id);
        
        if (!post) {
            return res.status(404).json({ mensaje: 'Post no encontrado' });
        }

        res.json(post);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const crearPostForo = async (req: Request, res: Response) => {
    try {
        const { usuario_id, titulo, contenido } = req.body;
        const nuevoPost = await foroService.crear(usuario_id, { titulo, contenido });
        res.status(201).json(nuevoPost);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};