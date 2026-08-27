import { listaModel } from "../models/lista.model.js";

class ListaController {
  async crear(req, res) {
    try {
      const { nombre, descripcion, tipo } = req.body;

      if (!nombre || !tipo) {
        return res.status(400).json({ error: "Faltan campos obligatorios (nombre, tipo)." });
      }

      await listaModel.crearLista(nombre, descripcion, tipo);
      return res.status(201).json({ message: "Lista creada correctamente." });
    } catch (error) {
      console.error("Error creando lista:", error.message);
      return res.status(500).json({ error: "Error interno al crear la lista." });
    }
  }

  async obtenerTodas(req, res) {
    try {
      const listas = await listaModel.obtenerTodas();
      return res.status(200).json(listas);
    } catch (error) {
      console.error("Error obteniendo listas:", error.message);
      return res.status(500).json({ error: "Error interno al obtener listas." });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      const lista = await listaModel.obtenerPorId(id);
      if (!lista) {
        return res.status(404).json({ error: "Lista no encontrada." });
      }

      return res.status(200).json(lista);
    } catch (error) {
      console.error("Error obteniendo lista por ID:", error.message);
      return res.status(500).json({ error: "Error interno." });
    }
  }

  async actualizar(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { nombre, descripcion, tipo } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      await listaModel.actualizarLista(id, nombre, descripcion, tipo);
      return res.status(200).json({ message: "Lista actualizada." });
    } catch (error) {
      console.error("Error actualizando lista:", error.message);
      return res.status(500).json({ error: "Error interno al actualizar." });
    }
  }

  async eliminar(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      await listaModel.eliminarLista(id);
      return res.status(200).json({ message: "Lista eliminada." });
    } catch (error) {
      console.error("Error eliminando lista:", error.message);
      return res.status(500).json({ error: "Error interno al eliminar." });
    }
  }
}

export default new ListaController();
