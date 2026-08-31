import { Request, Response } from 'express';
import opinionService from '../services/opinion.service.js';

export const obtenerOpinionesPorLibro = async (req: Request, res: Response) => {
    try {
        const { libro_id } = req.params;
        const opiniones = await opinionService.obtenerPorLibro(libro_id);
        res.json(opiniones);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const crearOpinion = async (req: Request, res: Response) => {
    try {
        const { usuario_id, libro_id, calificacion, texto } = req.body;
        const nuevaOpinion = await opinionService.crear(usuario_id, libro_id, calificacion, texto);
        res.status(201).json(nuevaOpinion);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};