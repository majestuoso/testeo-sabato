import { Request, Response } from 'express';
import listaService from '../services/lista.service.js';

export const obtenerListasPorUsuario = async (req: Request, res: Response) => {
    try {
        const { usuario_id } = req.params;
        const listas = await listaService.obtenerPorUsuario(usuario_id);
        res.json(listas);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const crearLista = async (req: Request, res: Response) => {
    try {
        const { usuario_id, nombre, descripcion } = req.body;
        const nuevaLista = await listaService.crear(usuario_id, nombre, descripcion);
        res.status(201).json(nuevaLista);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};