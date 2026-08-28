import prisma from '../prisma.js';

class FavoriteController {

  // 📘 GET: Obtener todos los favoritos (opcional, para testing o admin)
  async getAll(req, res) {
    try {
      const favorites = await prisma.favorito.findMany({
        include: {
          libro: true,
          usuario: true
        }
      });
      res.status(200).json(favorites);
    } catch (error) {
      console.error("Error getting favorites:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // ⭐ POST: Crear un nuevo favorito
  async create(req, res) {
    try {
      const usuario_id = req.userId; // viene del token (middleware verifyToken)
      const { libro_id } = req.body;

      if (!usuario_id || !libro_id) {
        return res.status(400).json({ error: "Missing required fields: usuario_id or libro_id" });
      }

      const newFavorite = await prisma.favorito.create({
        data: {
          usuario_id: Number(usuario_id),
          libro_id: Number(libro_id)
        },
        include: {
          libro: true
        }
      });

      res.status(201).json({
        message: "Favorite created successfully",
        favorite: newFavorite,
      });
    } catch (error) {
      console.error("Error creating favorite:", error.message);

      // Prisma maneja errores únicos con el código P2002
      if (error.code === 'P2002' || error.message.includes("duplicate key")) {
        return res.status(409).json({ error: "This book is already in your favorites" });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  }

  // 👤 GET: Obtener favoritos del usuario autenticado
  async getByUser(req, res) {
    try {
      const usuario_id = req.userId;

      if (!usuario_id) {
        return res.status(400).json({ error: "User ID missing in token" });
      }

      const favorites = await prisma.favorito.findMany({
        where: { usuario_id: Number(usuario_id) },
        include: {
          libro: true
        }
      });

      res.status(200).json(favorites);
    } catch (error) {
      console.error("Error getting user favorites:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // ❌ DELETE: Eliminar un favorito
  async delete(req, res) {
    try {
      const usuario_id = req.userId; // viene del token (middleware verifyToken)
      const { libro_id } = req.body;

      if (!usuario_id || isNaN(libro_id)) {
        return res.status(400).json({ error: "Invalid or missing IDs" });
      }

      // Prisma usa una clave compuesta para eliminar en tablas de PIVOTE (@@id([usuario_id, libro_id]))
      const deletedFavorite = await prisma.favorito.delete({
        where: {
          usuario_id_libro_id: {
            usuario_id: Number(usuario_id),
            libro_id: Number(libro_id)
          }
        }
      }).catch(() => null); // Capturamos el error si no existe para manejarlo limpiamente

      if (!deletedFavorite) {
        return res.status(404).json({ error: "Favorite not found" });
      }

      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting favorite:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new FavoriteController();