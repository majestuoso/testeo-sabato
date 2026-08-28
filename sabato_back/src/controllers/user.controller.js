import userService from '../services/user.service.js';

class UserController {
    async obtenerTodos(req, res) {
        try {
            const usuarios = await userService.obtenerTodos();
            res.json(usuarios);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ mensaje: 'Error al obtener la lista de usuarios' });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await userService.obtenerPorId(id);

            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
            res.json(usuario);
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).json({ mensaje: 'Error al obtener el detalle del usuario' });
        }
    }

    async actualizar(req, res) {
        try {
            const { id } = req.params;
            const usuarioActualizado = await userService.actualizar(id, req.body);
            res.json({
                mensaje: 'Usuario actualizado correctamente',
                usuario: usuarioActualizado
            });
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
        }
    }

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            await userService.eliminar(id);
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
        }
    }
}

export default new UserController();