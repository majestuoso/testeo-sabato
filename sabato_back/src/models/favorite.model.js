import { db } from "../db/connect/db.js";

export const favoriteModel = {
  async createFavorite({ usuario_id, libro_id }) {
    const query = `
      INSERT INTO favorito (usuario_id, libro_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    return db.one(query, [usuario_id, libro_id]);
  },

  async getAllFavorites() {
    const query = `SELECT * FROM favorito;`;
    return db.any(query);
  },

  async getFavoritesByUser(usuario_id) {
    const query = `
      SELECT f.libro_id, l.titulo, l.autor, l.genero, l.descripcion, l.portada_url, l.calificacion_promedio
      FROM favorito f
      JOIN libro l ON f.libro_id = l.libro_id
      WHERE f.usuario_id = $1;
    `;
    return db.any(query, [usuario_id]);
  },

  async deleteFavorite(usuario_id, libro_id) {
    const query = `
      DELETE FROM favorito
      WHERE usuario_id = $1 AND libro_id = $2;
    `;
    const result = await db.result(query, [usuario_id, libro_id]);
    return result.rowCount > 0;
  },
};
