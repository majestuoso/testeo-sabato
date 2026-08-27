import { db, pgp } from "../db/connect/db.js";

class ListaModel {
  async crearLista(nombre, descripcion, tipo) {
    try {
      const nuevaLista = await db.one(`
        INSERT INTO lista (nombre, descripcion, tipo)
        VALUES ($1, $2, $3)
        RETURNING lista_id, nombre, descripcion, tipo;
      `, [nombre, descripcion, tipo]);

      return nuevaLista;

    } catch (error) {
      console.error("Error en ListaModel.crearLista:", error.message);
      throw new Error("No se pudo crear la lista.");
    }
  }

  async obtenerTodas() {
    try {
      const listas = await db.any(`
        SELECT lista_id, nombre, descripcion, tipo
        FROM lista
        ORDER BY lista_id;
      `);

      return listas;

    } catch (error) {
      console.error("Error en ListaModel.obtenerTodas:", error.message);
      throw new Error("No se pudieron obtener las listas.");
    }
  }

  async obtenerPorId(listaId) {
    try {
      const lista = await db.oneOrNone(`
        SELECT lista_id, nombre, descripcion, tipo
        FROM lista
        WHERE lista_id = $1;
      `, [listaId]);

      return lista;

    } catch (error) {
      console.error(`Error en ListaModel.obtenerPorId (${listaId}):`, error.message);
      throw new Error("No se pudo obtener la lista.");
    }
  }

  async actualizarLista(listaId, nombre, descripcion, tipo) {
    try {
      const camposAActualizar = { nombre, descripcion, tipo };

      // Validación: eliminar campos undefined para evitar errores
      Object.keys(camposAActualizar).forEach(key => {
        if (camposAActualizar[key] === undefined) {
          delete camposAActualizar[key];
        }
      });

      if (Object.keys(camposAActualizar).length === 0) {
        throw new Error("No hay campos para actualizar.");
      }

      const setClause = pgp.helpers.sets(camposAActualizar);
      const query = `
        UPDATE lista
        SET ${setClause}
        WHERE lista_id = $1
        RETURNING lista_id, nombre, descripcion, tipo;
      `;

      const updated = await db.oneOrNone(query, [listaId]);

      if (!updated) {
        throw new Error(`Lista con ID ${listaId} no encontrada.`);
      }

      return updated;

    } catch (error) {
      console.error("Error en ListaModel.actualizarLista:", error.message);
      throw error;
    }
  }

  async eliminarLista(listaId) {
    try {
      const result = await db.result(`
        DELETE FROM lista
        WHERE lista_id = $1
      `, [listaId]);

      if (result.rowCount === 0) {
        throw new Error(`Lista con ID ${listaId} no encontrada.`);
      }

      return true;

    } catch (error) {
      console.error("Error en ListaModel.eliminarLista:", error.message);
      throw new Error("No se pudo eliminar la lista.");
    }
  }
}

export const listaModel = new ListaModel();

