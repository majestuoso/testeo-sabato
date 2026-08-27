import { listaLecturaModel } from "../models/listaLectura.model.js";

class ListaLecturaController {
  
  async crear(req, res) {
    try {
      const { lista_id, docente_id, descripcion, nivel } = req.body;

      if (!lista_id || !docente_id || !descripcion || !nivel) {
        return res.status(400).json({ error: "Faltan campos obligatorios." });
      }

      const nuevaLista = await listaLecturaModel.crearListaLectura(
        lista_id,
        docente_id,
        descripcion,
        nivel
      );

      res.status(201).json(nuevaLista);

    } catch (error) {
      console.error("Error al crear lista de lectura:", error.message);
      res.status(500).json({ error: "No se pudo crear la lista de lectura." });
    }
  }

 
  async obtenerTodas(req, res) {
    try {
      const listas = await listaLecturaModel.obtenerTodas();
      res.status(200).json(listas);
    } catch (error) {
      console.error("Error al obtener listas de lectura:", error.message);
      res.status(500).json({ error: "Error al obtener las listas de lectura." });
    }
  }

  
  async obtenerPorDocente(req, res) {
    try {
      const { docente_id } = req.params;

      if (!docente_id) {
        return res.status(400).json({ error: "ID de docente es requerido." });
      }

      const listas = await listaLecturaModel.obtenerPorDocente(docente_id);
      res.status(200).json(listas);
    } catch (error) {
      console.error("Error al obtener listas por docente:", error.message);
      res.status(500).json({ error: "No se pudieron obtener las listas." });
    }
  }

  
  async actualizar(req, res) {
    try {
      const { lista_id, docente_id } = req.params;
      const { descripcion, nivel } = req.body;

      if (!descripcion && !nivel) {
        return res.status(400).json({ error: "No se proporcionaron datos para actualizar." });
      }

      const actualizada = await listaLecturaModel.actualizarListaLectura(
        lista_id,
        docente_id,
        descripcion,
        nivel
      );

      res.status(200).json(actualizada);

    } catch (error) {
      const msg = error.message;

      if (msg.includes("No se encontró lista_lectura")) {
        return res.status(404).json({ error: msg });
      }

      console.error("Error al actualizar lista de lectura:", msg);
      res.status(500).json({ error: "No se pudo actualizar la lista de lectura." });
    }
  }

  
  async eliminar(req, res) {
    try {
      const { lista_id, docente_id } = req.params;

      await listaLecturaModel.eliminarListaLectura(lista_id, docente_id);

      res.status(204).send(); // Sin contenido

    } catch (error) {
      const msg = error.message;

      if (msg.includes("No se encontró lista_lectura")) {
        return res.status(404).json({ error: msg });
      }

      console.error("Error al eliminar lista de lectura:", msg);
      res.status(500).json({ error: "No se pudo eliminar la lista de lectura." });
    }
  }
}

export default new ListaLecturaController();

