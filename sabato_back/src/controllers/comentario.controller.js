import {
  insertarComentario,
  obtenerComentariosPorForo,
  obtenerTodosComentarios,
  obtenerComentarioPorId,
  actualizarComentarioPorId,
  eliminarComentarioPorId
} from '../models/comment.model.js';
import { medalModel } from '../models/medal.model.js';
import { obtenerForoConComentariosDB } from '../models/foro.model.js';

export const crearComentario = async (req, res) => {
  try {
    const { id } = req.params; // Foro ID desde la URL
    const { usuario_id, contenido } = req.body;

    const nuevoComentario = await insertarComentario(id, usuario_id, contenido);

    // Asignar medallas si aplica
    await medalModel.verificarYAsignarMedallas(usuario_id);

    // Obtener el comentario completo desde la DB
    const foroConComentarios = await obtenerForoConComentariosDB(id);
    const comentarioCompleto = foroConComentarios.comentarios.find(
      c => c.comentario_id === nuevoComentario.comentario_id
    );

    res.status(201).json(comentarioCompleto);
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
      comentarios = await obtenerComentariosPorForo(parseInt(req.params.foro_id));
    } else {
      comentarios = await obtenerTodosComentarios();
    }
    res.json(comentarios);
  } catch (error) {
    console.error("❌ Error al obtener comentarios:", error);
    res.status(500).json({ mensaje: 'Error al obtener los comentarios' });
  }
};

export const obtenerComentario = async (req, res) => {
  try {
    const comentario = await obtenerComentarioPorId(parseInt(req.params.id));
    if (!comentario) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    res.json(comentario);
  } catch (error) {
    console.error("❌ Error al obtener comentario:", error);
    res.status(500).json({ mensaje: 'Error al obtener el comentario' });
  }
};

export const actualizarComentario = async (req, res) => {
  try {
    const comentarioActualizado = await actualizarComentarioPorId(parseInt(req.params.id), req.body.contenido);
    if (!comentarioActualizado) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    res.json({ mensaje: 'Comentario actualizado correctamente' });
  } catch (error) {
    console.error("❌ Error al actualizar comentario:", error);
    res.status(500).json({ mensaje: 'Error al actualizar el comentario' });
  }
};

export const eliminarComentario = async (req, res) => {
  try {
    const comentarioEliminado = await eliminarComentarioPorId(parseInt(req.params.id));
    if (!comentarioEliminado) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    res.json({ mensaje: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error("❌ Error al eliminar comentario:", error);
    res.status(500).json({ mensaje: 'Error al eliminar el comentario' });
  }
};
