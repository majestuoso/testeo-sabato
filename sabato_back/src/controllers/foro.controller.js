import foroService from '../services/foro.service.js';

class ForoController {
    async obtenerTodos(req, res) {
        try {
            const foros = await foroService.obtenerTodos();
            res.json(foros);
        } catch (error) {
            console.error('Error al obtener foros:', error);
            res.status(500).json({ mensaje: 'Error al obtener los foros' });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const foro = await foroService.obtenerPorId(id);

            if (!foro) {
                return res.status(404).json({ mensaje: 'Foro no encontrado' });
            }
            res.json(foro);
        } catch (error) {
            console.error('Error al obtener el foro:', error);
            res.status(500).json({ mensaje: 'Error al obtener el detalle del foro' });
        }
    }

    async crear(req, res) {
        try {
            const nuevoForo = await foroService.crear(req.body);
            res.status(201).json({
                mensaje: 'Foro creado correctamente',
                foro: nuevoForo
            });
        } catch (error) {
            console.error('Error al crear foro:', error);
            res.status(500).json({ mensaje: 'Error al crear el foro' });
        }
    }

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            await foroService.eliminar(id);
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar foro:', error);
            res.status(500).json({ mensaje: 'Error al eliminar el foro' });
        }
    }
}

export default new ForoController();