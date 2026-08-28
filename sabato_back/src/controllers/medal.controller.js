import prisma from '../prisma.js';

// Controlador para obtener las medallas de un usuario
export const obtenerMedallasUsuario = async (req, res) => {
  try {
    const usuario_id = parseInt(req.params.usuario_id);
    if (isNaN(usuario_id)) {
      return res.status(400).json({ mensaje: 'ID de usuario inválido' });
    }

    // Obtener las medallas del usuario mediante la relación usuario_medalla
    const usuarioConMedallas = await prisma.usuario.findUnique({
      where: { usuario_id },
      include: {
        usuario_medalla: {
          include: {
            medalla: true
          }
        }
      }
    });

    if (!usuarioConMedallas) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Extraemos limpiamente el listado de medallas para que el frontend lo reciba igual que antes
    const medallas = usuarioConMedallas.usuario_medalla.map(um => ({
      ...um.medalla,
      fecha_obtencion: um.fecha_obtencion
    }));

    res.json(medallas);
  } catch (error) {
    console.error('❌ Error al obtener medallas del usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener las medallas', detalle: error.message });
  }
}