import favoriteService from '../services/favorite.service.js';

class FavoriteController {
    async obtenerPorUsuario(req, res) {
        try {
            const { usuario_id } = req.params;
            const favoritos = await favoriteService.obtenerPorUsuario(usuario_id);
            res.json(favoritos);
        } catch (error) {
            console.error('Error al obtener favoritos:', error);
            res.status(500).json({ mensaje: 'Error al obtener los favoritos' });
        }
    }

    async agregar(req, res) {
        try {
            const { usuario_id, libro_id } = req.body;
            const nuevoFavorito = await favoriteService.agregar(usuario_id, libro_id);
            res.status(201).json({
                mensaje: 'Libro agregado a favoritos correctamente',
                favorito: nuevoFavorito
            });
        } catch (error) {
            console.error('Error al agregar favorito:', error);
            res.status(500).json({ mensaje: 'Error al agregar a favoritos' });
        }
    }

    async eliminar(req, res) {
        try {
            const { usuario_id, libro_id } = req.params;
            await favoriteService.eliminar(usuario_id, libro_id);
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar favorito:', error);
            res.status(500).json({ mensaje: 'Error al eliminar de favoritos' });
        }
    }
}

export default new FavoriteController();