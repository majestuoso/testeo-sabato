import prisma from '../prisma.js';

class ListaController {
  async crear(req, res) {
    try {
      const { nombre, descripcion, tipo } = req.body;

      if (!nombre || !tipo) {
        return res.status(400).json({ error: "Faltan campos obligatorios (nombre, tipo)." });
      }

      const nuevaLista = await prisma.lista.create({
        data: {
          nombre,
          descripcion,
          tipo
        }
      });

      return res.status(201).json({ message: "Lista creada correctamente.", lista: nuevaLista });
    } catch (error) {
      console.error("Error creando lista:", error.message);
      return res.status(500).json({ error: "Error interno al crear la lista." });
    }
  }

  async obtenerTodas(req, res) {
    try {
      const listas = await prisma.lista.findMany({
        include: {
          lista_libro: {
            include: { libro: true }
          },
          lista_lectura: true
        }
      });
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

      const lista = await prisma.lista.findUnique({
        where: { lista_id: id },
        include: {
          lista_libro: {
            include: { libro: true }
          },
          lista_lectura: true
        }
      });

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

      const listaActualizada = await prisma.lista.update({
        where: { lista_id: id },
        data: {
          ...(nombre && { nombre }),
          ...(descripcion !== undefined && { descripcion }),
          ...(tipo && { tipo })
        }
      });

      return res.status(200).json({ message: "Lista actualizada.", lista: listaActualizada });
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

      await prisma.lista.delete({
        where: { lista_id: id }
      });

      return res.status(200).json({ message: "Lista eliminada." });
    } catch (error) {
      console.error("Error eliminando lista:", error.message);
      return res.status(500).json({ error: "Error interno al eliminar." });
    }
  }
}

export default new ListaController();