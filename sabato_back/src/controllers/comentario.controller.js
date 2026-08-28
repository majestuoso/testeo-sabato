import prisma from '../prisma.js';

export const crearComentario = async (req, res) => {
  try {
    const { id } = req.params; // Foro ID desde la URL
    const { usuario_id, contenido } = req.body;

    const nuevoComentario = await prisma.comentario_foro.create({
      data: {
        foro_id: Number(id),
        usuario_id: usuario_id ? Number(usuario_id) : null,
        contenido
      },
      include: {
        usuario: true
      }
    });

    // Asignar medallas si aplica (manteniendo la lógica previa si el método existe o adaptándolo)
    // await medalModel.verificarYAsignarMedallas(usuario_id);

    res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error("❌ Error al crear comentario:", error);
    res.status(500).json({
      mensaje: 'Error al crear el comentario',
      detalle: error.message
    });
  }
};

export const obtenerComentarios = async (req, res) => {
  try {
    let comentarios;
    if (req.params.foro_id) {
      comentarios = await prisma.comentario_foro.findMany({
        where: { foro_id: parseInt(req.params.foro_id) },
        include: { usuario: true }
      });
    } else {
      comentarios = await prisma.comentario_foro.findMany({
        include: { usuario: true, foro: true }
      });
    }
    res.json(comentarios);
  } catch (error) {
    console.error("❌ Error al obtener comentarios:", error);
    res.status(500).json({ mensaje: 'Error al obtener los comentarios' });
  }
};

export const obtenerComentario = async (req, res) => {
  try {
    const comentario = await prisma.comentario_foro.findUnique({
      where: { comentario_id: parseInt(req.params.id) },
      include: { usuario: true }
    });
    if (!comentario) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    res.json(comentario);
  } catch (error) {
    console.error("❌ Error al obtener comentario:", error);
    res.status(500).json({ mensaje: 'Error al obtener el comentario' });
  }
};

export const actualizarComentario = async (req, res) => {
  try {
    const comentarioActualizado = await prisma.comentario_foro.update({
      where: { comentario_id: parseInt(req.params.id) },
      data: { contenido: req.body.contenido }
    });
    if (!comentarioActualizado) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    res.json({ mensaje: 'Comentario actualizado correctamente', comentario: comentarioActualizado });
  } catch (error) {
    console.error("❌ Error al actualizar comentario:", error);
    res.status(500).json({ mensaje: 'Error al actualizar el comentario' });
  }
};

export const eliminarComentario = async (req, res) => {
  try {
    await prisma.comentario_foro.delete({
      where: { comentario_id: parseInt(req.params.id) }
    });
    res.json({ mensaje: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error("❌ Error al eliminar comentario:", error);
    res.status(500).json({ mensaje: 'Error al eliminar el comentario' });
  }
};