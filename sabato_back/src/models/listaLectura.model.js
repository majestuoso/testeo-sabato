import { db, pgp } from "../db/connect/db.js";

class ListaLecturaModel {
  
  async crearListaLectura(lista_id, docente_id, descripcion, nivel) {
    try {
      const nueva = await db.one(`
        INSERT INTO lista_lectura (lista_id, docente_id, descripcion, nivel)
        VALUES ($1, $2, $3, $4)
        RETURNING lista_id, docente_id, descripcion, nivel, fecha_creacion;
      `, [lista_id, docente_id, descripcion, nivel]);

      return nueva;

    } catch (error) {
      console.error("Error en ListaLecturaModel.crearListaLectura:", error.message);
      throw new Error("No se pudo crear la lista de lectura.");
    }
  }

  
  async obtenerTodas() {
    try {
      const listas = await db.any(`
        SELECT 
          ll.lista_id,
          ll.docente_id,
          l.nombre AS nombre_lista,
          ll.descripcion,
          ll.nivel,
          ll.fecha_creacion
        FROM lista_lectura ll
        JOIN lista l ON ll.lista_id = l.lista_id
        ORDER BY ll.fecha_creacion DESC;
      `);
      return listas;
    } catch (error) {
      console.error("Error en ListaLecturaModel.obtenerTodas:", error.message);
      throw new Error("No se pudieron obtener las listas de lectura.");
    }
  }

  
  async obtenerPorDocente(docente_id) {
    try {
      const listas = await db.any(`
        SELECT 
          ll.lista_id,
          l.nombre AS nombre_lista,
          ll.descripcion,
          ll.nivel,
          ll.fecha_creacion
        FROM lista_lectura ll
        JOIN lista l ON ll.lista_id = l.lista_id
        WHERE ll.docente_id = $1
        ORDER BY ll.fecha_creacion DESC;
      `, [docente_id]);

      return listas;

    } catch (error) {
      console.error(`Error en ListaLecturaModel.obtenerPorDocente (${docente_id}):`, error.message);
      throw new Error("No se pudieron obtener las listas del docente.");
    }
  }

 
  async actualizarListaLectura(lista_id, docente_id, descripcion, nivel) {
    try {
      const campos = { descripcion, nivel };

      
      Object.keys(campos).forEach(key => {
        if (campos[key] === undefined) delete campos[key];
      });

      if (Object.keys(campos).length === 0) {
        throw new Error("No hay campos para actualizar.");
      }

      const setClause = pgp.helpers.sets(campos);
      const query = `
        UPDATE lista_lectura
        SET ${setClause}
        WHERE lista_id = $1 AND docente_id = $2
        RETURNING lista_id, docente_id, descripcion, nivel, fecha_creacion;
      `;

      const updated = await db.oneOrNone(query, [lista_id, docente_id]);

      if (!updated) {
        throw new Error(`No se encontró lista_lectura con lista_id ${lista_id} y docente_id ${docente_id}.`);
      }

      return updated;

    } catch (error) {
      console.error("Error en ListaLecturaModel.actualizarListaLectura:", error.message);
      throw error;
    }
  }

  
  async eliminarListaLectura(lista_id, docente_id) {
    try {
      const result = await db.result(`
        DELETE FROM lista_lectura
        WHERE lista_id = $1 AND docente_id = $2
      `, [lista_id, docente_id]);

      if (result.rowCount === 0) {
        throw new Error(`No se encontró lista_lectura con lista_id ${lista_id} y docente_id ${docente_id}.`);
      }

      return true;

    } catch (error) {
      console.error("Error en ListaLecturaModel.eliminarListaLectura:", error.message);
      throw new Error("No se pudo eliminar la lista de lectura.");
    }
  }
}

export const listaLecturaModel = new ListaLecturaModel();

