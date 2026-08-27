import { medalModel } from '../models/medal.model.js';

// Controlador para obtener las medallas de un usuario
export const obtenerMedallasUsuario = async (req, res) => {
  try {
    const usuario_id = parseInt(req.params.usuario_id);
    if (isNaN(usuario_id)) {
      return res.status(400).json({ mensaje: 'ID de usuario inválido' });
    }
    // Obtener las medallas del usuario
    const medallas = await medalModel.obtenerMedallasPorUsuario(usuario_id);
    res.json(medallas);
  } catch (error) {
    console.error('❌ Error al obtener medallas del usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener las medallas', detalle: error.message });
  }
}