import medalService from '../services/medal.service.js';

class MedalController {
    async obtenerTodas(req, res) {
        try {
            const medallas = await medalService.obtenerTodas();
            res.json(medallas);
        } catch (error) {
            console.error('Error al obtener medallas:', error);
            res.status(500).json({ mensaje: 'Error al obtener el catálogo de medallas' });
        }
    }

    async obtenerPorUsuario(req, res) {
        try {
            const { usuario_id } = req.params;
            const medallasUsuario = await medalService.obtenerPorUsuario(usuario_id);
            res.json(medallasUsuario);
        } catch (error) {
            console.error('Error al obtener medallas del usuario:', error);
            res.status(500).json({ mensaje: 'Error al obtener las medallas del usuario' });
        }
    }

    async otorgarMedalla(req, res) {
        try {
            const { usuario_id, medalla_id } = req.body;
            const nuevaMedallaUsuario = await medalService.otorgarMedalla(usuario_id, medalla_id);
            res.status(201).json({
                mensaje: 'Medalla otorgada correctamente',
                usuarioMedalla: nuevaMedallaUsuario
            });
        } catch (error) {
            console.error('Error al otorgar medalla:', error);
            res.status(500).json({ mensaje: 'Error al otorgar la medalla' });
        }
    }
}

export default new MedalController();