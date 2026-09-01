// controllers/favorite.controller.ts
import { Request, Response } from 'express';
import favoriteService from '../services/favorite.service.js';

export const obtenerFavoritos = async (req: Request, res: Response) => {
    try {
        // Intentamos leer el ID desde params o desde la sesión/token
        const usuarioId = req.params.usuario_id || (req as any).user?.usuario_id || (req as any).user?.id;

        console.log("👉 [BACKEND - GET] req.params recibido:", req.params);
        console.log("👉 [BACKEND - GET] ID de usuario procesado:", usuarioId);

        if (!usuarioId) {
            console.warn("⚠️ [BACKEND - GET] No se especificó un usuarioId válido.");
            return res.status(400).json({ error: 'Falta el ID del usuario' });
        }

        const favoritos = await favoriteService.obtenerPorUsuario(usuarioId);
        console.log("👉 [BACKEND - GET] Favoritos obtenidos del service:", favoritos);

        return res.status(200).json(favoritos || []);
    } catch (error: any) {
        console.error("❌ [BACKEND - GET] Error en obtenerFavoritos:", error);
        return res.status(500).json({ error: error.message });
    }
};

export const agregarFavorito = async (req: Request, res: Response) => {
    try {
        const usuarioId = (req as any).user?.usuario_id || (req as any).user?.id || req.body.usuario_id;
        const { libro_id } = req.body;

        console.log("👉 [BACKEND - POST] Body recibido:", req.body);
        console.log("👉 [BACKEND - POST] Datos extraídos:", { usuarioId, libro_id });

        if (!usuarioId || !libro_id) {
            console.warn("⚠️ [BACKEND - POST] Faltan datos obligatorios.");
            return res.status(400).json({ error: 'Faltan datos (usuario_id, libro_id)' });
        }

        const nuevoFavorito = await favoriteService.agregar(usuarioId, libro_id);
        console.log("👉 [BACKEND - POST] Resultado del service:", nuevoFavorito);

        return res.status(201).json(nuevoFavorito);
    } catch (error: any) {
        console.error("❌ [BACKEND - POST] Error en agregarFavorito:", error);
        return res.status(500).json({ error: error.message });
    }
};

export const eliminarFavorito = async (req: Request, res: Response) => {
    try {
        const usuarioId = (req as any).user?.usuario_id || (req as any).user?.id || req.body.usuario_id || req.params.usuario_id;
        const libroId = req.body.libro_id || req.params.libro_id;

        console.log("👉 [BACKEND - DELETE] Datos extraídos:", { usuarioId, libroId });

        if (!usuarioId || !libroId) {
            console.warn("⚠️ [BACKEND - DELETE] Faltan datos obligatorios para eliminar.");
            return res.status(400).json({ error: 'Faltan datos (usuario_id, libro_id)' });
        }

        const resultado = await favoriteService.eliminar(usuarioId, libroId);
        console.log("👉 [BACKEND - DELETE] Resultado del service:", resultado);

        return res.status(200).json({ mensaje: 'Favorito eliminado con éxito', resultado });
    } catch (error: any) {
        console.error("❌ [BACKEND - DELETE] Error en eliminarFavorito:", error);
        return res.status(500).json({ error: error.message });
    }
};