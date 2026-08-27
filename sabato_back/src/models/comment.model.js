import { db }  from '../db/connect/db.js';

export const insertarComentario = async (foro_id, usuario_id, contenido) => {
  try {
  const sql = `
    INSERT INTO comentario_foro (foro_id, usuario_id, contenido)
    VALUES ($1, $2, $3)
    RETURNING comentario_id
  `;
  
  return await db.one(sql, [foro_id, usuario_id, contenido]);
  } catch (error) {
    console.error("Error OpinionModel.createOpinion:", error.message);
    throw error;
  }
};

export const obtenerComentariosPorForo = async (foro_id) => {
    return await db.any(`
      SELECT cf.*, u.usuario_id, u.nombre, u.email
      FROM comentario_foro cf
      INNER JOIN usuario u ON cf.usuario_id = u.usuario_id
      WHERE cf.foro_id = ${foro_id}
      ORDER BY cf.fecha ASC
    `);
};

export const obtenerTodosComentarios = async () => {
    return await db.any(`SELECT * FROM comentario_foro ORDER BY fecha ASC`);
};

export const obtenerComentarioPorId = async (comentario_id) => {
    const result = await db.any(`
    SELECT * FROM comentario_foro WHERE comentario_id = ${comentario_id}
  `);
    return result[0];
};

export const actualizarComentarioPorId = async (comentario_id, contenido) => {
    const sql = `
    UPDATE comentario_foro
    SET contenido = $1
    WHERE comentario_id = $2
    RETURNING comentario_id
  `;
    return await db.one(sql, [contenido, comentario_id]);
};

export const eliminarComentarioPorId = async (comentario_id) => {
    const sql = `
    DELETE FROM comentario_foro
    WHERE comentario_id = $1
    RETURNING comentario_id
  `;
    return await db.one(sql, [comentario_id]);
};
