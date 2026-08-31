import { Request, Response } from 'express';
import listaLecturaService from '../services/listaLectura.service.js';

export const obtenerListaLectura = async (req: Request, res: Response) => {
    try {
        const { docente_id } = req.params;
        const listas = await listaLecturaService.obtenerPorUsuario(docente_id);
        res.json(listas);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const agregarListaDocente = async (req: Request, res: Response) => {
    try {
        const { docente_id, lista_id, descripcion, nivel } = req.body;
        const nuevaEntrada = await listaLecturaService.agregarListaADocente(docente_id, lista_id, descripcion, nivel);
        res.status(201).json(nuevaEntrada);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};