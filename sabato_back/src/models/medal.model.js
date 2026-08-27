import { db } from '../db/connect/db.js';

/*
medalla_id 
Para libros 2
foros 1 

*/

class MedalModel {
  async verificarYAsignarMedallas(usuario_id) {
    try {
      // Verificar cantidad de opiniones
      const { count: cantidadOpiniones } = await db.one(`
        SELECT COUNT(*) FROM opinion WHERE usuario_id = $1
      `, [usuario_id]);

      console.log("cantidadOpiniones", cantidadOpiniones);
      

      if (parseInt(cantidadOpiniones, 10) >= 1) {
        await this.asignarMedallaSiNoTiene(usuario_id, 6); // medalla_id para 'Opinador' de libros
      }
      if (parseInt(cantidadOpiniones, 10) >= 10) {
        await this.asignarMedallaSiNoTiene(usuario_id, 1); // medalla_id para 'Debatiente' de libros
      }

      // Verificar cantidad de participaciones en foros
      const { count: cantidadForos } = await db.one(`
        SELECT COUNT(*) FROM comentario_foro WHERE usuario_id = $1
      `, [usuario_id]);

      if (parseInt(cantidadForos, 10) >= 1) {
        await this.asignarMedallaSiNoTiene(usuario_id, 5); // medalla_id para 'Comentador' de foros
      }
      if (parseInt(cantidadForos, 10) >= 10) {
        await this.asignarMedallaSiNoTiene(usuario_id, 2); // medalla_id para 'Comentador Activo' de foros
      }

    } catch (error) {
      console.error('Error al verificar o asignar medallas:', error.message);
    }
  }

  async asignarMedallaSiNoTiene(usuario_id, medalla_id) {

    // Verifica si el usuario ya tiene la medalla
    const yaTiene = await db.oneOrNone(`
      SELECT * FROM usuario_medalla WHERE usuario_id = $1 AND medalla_id = $2
    `, [usuario_id, medalla_id]);

    console.log("yaTiene", yaTiene, usuario_id, medalla_id);
    

    if (!yaTiene) {
      await db.none(`
        INSERT INTO usuario_medalla (usuario_id, medalla_id)
        VALUES ($1, $2)
      `, [usuario_id, medalla_id]);

      console.log(`✅ Medalla '${nombre}' asignada al usuario ${usuario_id}`);
    }
  }

  // Obtener todas las medallas de un usuario
  async obtenerMedallasPorUsuario(usuario_id) {
    try {
      const medallas = await db.any(`
                SELECT m.medalla_id, m.nombre, m.descripcion, m.tipo_accion
                FROM medalla m
                INNER JOIN usuario_medalla um ON m.medalla_id = um.medalla_id
                WHERE um.usuario_id = $1
            `, [usuario_id]);
      return medallas;
    } catch (error) {
      console.error('Error al obtener medallas del usuario:', error.message);
      throw error;
    }
  }
}

export const medalModel = new MedalModel();
