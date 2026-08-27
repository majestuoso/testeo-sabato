import { db, pgp } from "../db/connect/db.js";

class OpinionModel {
  async getAllOpinions() {
    const sql = `
      SELECT 
        o.opinion_id,
        o.usuario_id,
        u.nombre AS usuario_nombre,
        o.libro_id,
        l.titulo AS libro_titulo,
        o.calificacion,
        o.comentario,
        o.fecha
      FROM opinion o
      INNER JOIN usuario u ON o.usuario_id = u.usuario_id
      INNER JOIN libro l ON o.libro_id = l.libro_id
      ORDER BY o.fecha DESC;
    `;
    try {
      return await db.any(sql);
    } catch (error) {
      console.error("Error OpinionModel.getAllOpinions:", error.message);
      throw new Error("Failed to retrieve opinions.");
    }
  }

  async getOpinionById(opinionId) {
    try {
      const sql = `
        SELECT 
          o.opinion_id,
          o.usuario_id,
          u.nombre AS usuario_nombre,
          o.libro_id,
          l.titulo AS libro_titulo,
          o.calificacion,
          o.comentario,
          o.fecha
        FROM opinion o
        INNER JOIN usuario u ON o.usuario_id = u.usuario_id
        INNER JOIN libro l ON o.libro_id = l.libro_id
        WHERE o.opinion_id = $1;
      `;
      return await db.oneOrNone(sql, [opinionId]);
    } catch (error) {
      console.error("Error OpinionModel.getOpinionById:", error.message);
      throw error;
    }
  }

  async createOpinion(opinionData) {
  const { usuario_id, libro_id, calificacion, comentario } = opinionData;
  const fecha = new Date();

  try {
    // Insertamos la opinión y devolvemos el registro con el nombre del usuario
    const sql = `
      WITH nueva AS (
        INSERT INTO opinion (usuario_id, libro_id, calificacion, comentario, fecha)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING opinion_id, usuario_id, libro_id, calificacion, comentario, fecha
      )
      SELECT n.*, u.nombre AS usuario_nombre
      FROM nueva n
      JOIN usuario u ON n.usuario_id = u.usuario_id;
    `;
    return await db.one(sql, [usuario_id, libro_id, calificacion, comentario, fecha]);
  } catch (error) {
    console.error("Error OpinionModel.createOpinion:", error.message);
    throw error;
  }
}



  async updateOpinion(opinionId, updatedFields) {
    if (Object.keys(updatedFields).length === 0) {
      throw new Error("No data provided for update.");
    }
    try {
      const setClause = pgp.helpers.sets(updatedFields, null, "opinion");
      const sql = `
        UPDATE opinion
        SET ${setClause}
        WHERE opinion_id = $1
        RETURNING opinion_id, usuario_id, libro_id, calificacion, comentario, fecha;
      `;
      const result = await db.oneOrNone(sql, [opinionId]);
      if (!result) throw new Error(`Opinion ID ${opinionId} not found.`);
      return result;
    } catch (error) {
      console.error("Error OpinionModel.updateOpinion:", error.message);
      throw error;
    }
  }

  async deleteOpinion(opinionId) {
    try {
      const result = await db.result(
        "DELETE FROM opinion WHERE opinion_id = $1",
        [opinionId]
      );
      if (result.rowCount === 0)
        throw new Error(`Opinion ID ${opinionId} not found.`);
      return true;
    } catch (error) {
      console.error("Error OpinionModel.deleteOpinion:", error.message);
      throw error;
    }
  }
  async getOpinionsByLibro(libroId) {
  const sql = `
    SELECT 
      o.opinion_id,
      o.usuario_id,
      u.nombre AS usuario_nombre,
      o.libro_id,
      o.calificacion,
      o.comentario,
      o.fecha
    FROM opinion o
    INNER JOIN usuario u ON o.usuario_id = u.usuario_id
    WHERE o.libro_id = $1
    ORDER BY o.fecha DESC;
  `;
  try {
    return await db.any(sql, [libroId]);
  } catch (error) {
    console.error("Error OpinionModel.getOpinionsByLibro:", error.message);
    throw new Error("Failed to retrieve opinions for libro.");
  }
}

}

export const opinionModel = new OpinionModel();
