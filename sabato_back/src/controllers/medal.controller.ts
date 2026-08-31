import { Request, Response } from 'express';
import medalService from '../services/medal.service.js';

export const obtenerMedallas = async (_req: Request, res: Response) => {
    try {
        const medallas = await medalService.obtenerTodas();
        res.json(medallas);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerMedallasUsuario = async (req: Request, res: Response) => {
    try {
        const { usuario_id } = req.params;
        const medallas = await medalService.obtenerPorUsuario(usuario_id);
        res.json(medallas);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const otorgarMedalla = async (req: Request, res: Response) => {
    try {
        const { usuario_id, medalla_id } = req.body;
        const medallaOtorgada = await medalService.otorgarMedalla(usuario_id, medalla_id);
        res.status(201).json(medallaOtorgada);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};