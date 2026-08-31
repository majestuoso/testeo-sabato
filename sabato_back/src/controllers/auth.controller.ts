import { Request, Response } from 'express';
import authService from '../services/auth.service.js';

export const registrar = async (req: Request, res: Response) => {
    try {
        const { nombre, email, contrasena, rol_id, avatar_url, nivel_educativo } = req.body;
        const usuarioExistente = await authService.buscarPorEmail(email);
        
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }

        const nuevoUsuario = await authService.registrar({
            nombre,
            email,
            contrasena,
            rol_id,
            avatar_url,
            nivel_educativo
        });

        res.status(201).json(nuevoUsuario);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, contrasena } = req.body;
        const usuario = await authService.buscarPorEmail(email);

        if (!usuario || usuario.contrasena !== contrasena) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        res.json({ mensaje: 'Login exitoso', usuario });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};