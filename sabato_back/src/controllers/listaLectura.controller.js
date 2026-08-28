import prisma from '../prisma.js';

class ListaLecturaController {
  
  async crear(req, res) {
    try {
      const { lista_id, docente_id, descripcion, nivel } = req.body;

      if (!lista_id || !docente_id || !descripcion || !nivel) {
        return res.status(400).json({ error: "Faltan campos obligatorios." });
      }

      const nuevaLista = await prisma.lista_lectura.create({
        data: {
          lista_id: Number(lista_id),
          docente_id: Number(docente_id),
          descripcion,
          nivel
        },
        include: {
          lista: true,
          usuario: true
        }
      });

      res.status(201).json(nuevaLista);

    } catch (error) {
      console.error("Error al crear lista de lectura:", error.message);
      res.status(500).json({ error: "No se pudo crear la lista de lectura." });
    }
  }

 
  async obtenerTodas(req, res) {
    try {
      const listas = await prisma.lista_lectura.findMany({
        include: {
          lista: true,
          usuario: true
        }
      });
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

      const listas = await prisma.lista_lectura.findMany({
        where: { docente_id: Number(docente_id) },
        include: {
          lista: true
        }
      });
      
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

      // Prisma usa clave compuesta para actualizar en tablas de pivote
      const actualizada = await prisma.lista_lectura.update({
        where: {
          lista_id_docente_id: {
            lista_id: Number(lista_id),
            docente_id: Number(docente_id)
          }
        },
        data: {
          ...(descripcion && { descripcion }),
          ...(nivel && { nivel })
        },
        include: {
          lista: true,
          usuario: true
        }
      }).catch(() => null);

      if (!actualizada) {
        return res.status(404).json({ error: "No se encontró lista_lectura para actualizar." });
      }

      res.status(200).json(actualizada);

    } catch (error) {
      console.error("Error al actualizar lista de lectura:", error.message);
      res.status(500).json({ error: "No se pudo actualizar la lista de lectura." });
    }
  }

  
  async eliminar(req, res) {
    try {
      const { lista_id, docente_id } = req.params;

      const eliminada = await prisma.lista_lectura.delete({
        where: {
          lista_id_docente_id: {
            lista_id: Number(lista_id),
            docente_id: Number(docente_id)
          }
        }
      }).catch(() => null);

      if (!eliminada) {
        return res.status(404).json({ error: "No se encontró lista_lectura para eliminar." });
      }

      res.status(204).send(); // Sin contenido

    } catch (error) {
      console.error("Error al eliminar lista de lectura:", error.message);
      res.status(500).json({ error: "No se pudo eliminar la lista de lectura." });
    }
  }
}

export default new ListaLecturaController();