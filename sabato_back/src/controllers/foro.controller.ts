import { Request, Response } from 'express';
import foroService from '../services/foro.service.js';

export const obtenerPostsForo = async (_req: Request, res: Response) => {
    try {
        const posts = await foroService.obtenerTodos();
        res.json(posts);
    } catch (error: any) {
        console.error("DETALLE DEL ERROR EN FORO:", error);
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
        // Recibimos los datos del cuerpo de la petición
        const { usuario_id, titulo, contenido, descripcion } = req.body;

        // Se asigna 'contenido' a 'descripcion' para coincidir con el schema de Prisma
        const nuevoPost = await foroService.crear(usuario_id, { 
            titulo, 
            descripcion: contenido || descripcion 
        });

        res.status(201).json(nuevoPost);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};