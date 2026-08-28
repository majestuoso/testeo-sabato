import opinionService from '../services/opinion.service.js';

class OpinionController {
    async obtenerPorLibro(req, res) {
        try {
            const { libro_id } = req.params;
            const opiniones = await opinionService.obtenerPorLibro(libro_id);
            res.json(opiniones);
        } catch (error) {
            console.error('Error al obtener opiniones:', error);
            res.status(500).json({ mensaje: 'Error al obtener las opiniones del libro' });
        }
    }

    async crear(req, res) {
        try {
            const nuevaOpinion = await opinionService.crear(req.body);
            res.status(201).json({
                mensaje: 'Opinión creada correctamente',
                opinion: nuevaOpinion
            });
        } catch (error) {
            console.error('Error al crear opinión:', error);
            res.status(500).json({ mensaje: 'Error al crear la opinión' });
        }
    }

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            await opinionService.eliminar(id);
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar opinión:', error);
            res.status(500).json({ mensaje: 'Error al eliminar la opinión' });
        }
    }
}

export default new OpinionController();