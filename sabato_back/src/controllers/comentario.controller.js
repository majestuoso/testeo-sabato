import commentService from '../services/comment.service.js';

class ComentarioController {
    async obtenerPorForo(req, res) {
        try {
            const { foro_id } = req.params;
            const comentarios = await commentService.obtenerPorForo(foro_id);
            res.json(comentarios);
        } catch (error) {
            console.error('Error al obtener comentarios:', error);
            res.status(500).json({ mensaje: 'Error al obtener comentarios del foro' });
        }
    }

    async crear(req, res) {
        try {
            const nuevoComentario = await commentService.crear(req.body);
            res.status(201).json({
                mensaje: 'Comentario creado correctamente',
                comentario: nuevoComentario
            });
        } catch (error) {
            console.error('Error al crear comentario:', error);
            res.status(500).json({ mensaje: 'Error al crear comentario' });
        }
    }

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            await commentService.eliminar(id);
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar comentario:', error);
            res.status(500).json({ mensaje: 'Error al eliminar comentario' });
        }
    }
}

export default new ComentarioController();