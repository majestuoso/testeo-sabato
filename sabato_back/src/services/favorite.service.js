import prisma from '../prisma.js';

class FavoriteService {
    async obtenerPorUsuario(usuario_id) {
        return await prisma.favorito.findMany({
            where: { usuario_id: Number(usuario_id) },
            include: { libro: true }
        });
    }

    async agregar(usuario_id, libro_id) {
        return await prisma.favorito.create({
            data: {
                usuario_id: Number(usuario_id),
                libro_id: Number(libro_id)
            }
        });
    }

    async eliminar(usuario_id, libro_id) {
        return await prisma.favorito.delete({
            where: {
                usuario_id_libro_id: {
                    usuario_id: Number(usuario_id),
                    libro_id: Number(libro_id)
                }
            }
        });
    }
}

export default new FavoriteService();