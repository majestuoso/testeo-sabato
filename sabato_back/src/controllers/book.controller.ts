import { Request, Response } from 'express';
import bookService from '../services/book.service.js';

export const obtenerLibros = async (_req: Request, res: Response) => {
    try {
        const libros = await bookService.obtenerTodos();
        res.json(libros);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerLibroPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const libro = await bookService.obtenerPorId(id);
        
        if (!libro) {
            return res.status(404).json({ mensaje: 'Libro no encontrado' });
        }
        
        res.json(libro);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const crearLibro = async (req: Request, res: Response) => {
    try {
        const nuevoLibro = await bookService.crear(req.body);
        res.status(201).json(nuevoLibro);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarLibro = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const libroActualizado = await bookService.actualizar(id, req.body);
        res.json(libroActualizado);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarLibro = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await bookService.eliminar(id);
        res.json({ mensaje: 'Libro eliminado correctamente' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};