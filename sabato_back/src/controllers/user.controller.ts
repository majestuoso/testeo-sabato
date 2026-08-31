import { Request, Response } from 'express';
import userService from '../services/user.service.js';

export const obtenerUsuarios = async (_req: Request, res: Response) => {
    try {
        const usuarios = await userService.obtenerTodos();
        res.json(usuarios);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const usuario = await userService.obtenerPorId(id);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const usuarioActualizado = await userService.actualizar(id, req.body);
        res.json(usuarioActualizado);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await userService.eliminar(id);
        res.json({ mensaje: 'Usuario eliminado' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};