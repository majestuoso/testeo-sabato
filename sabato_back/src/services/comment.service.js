import prisma from '../prisma.js';

class CommentService {
    async obtenerPorForo(foro_id) {
        return await prisma.comentario_foro.findMany({
            where: { foro_id: Number(foro_id) },
            include: { usuario: { select: { nombre: true, avatar_url: true } } }
        });
    }

    async crear(data) {
        return await prisma.comentario_foro.create({
            data: {
                foro_id: Number(data.foro_id),
                usuario_id: Number(data.usuario_id),
                contenido: data.contenido
            }
        });
    }

    async eliminar(id) {
        return await prisma.comentario_foro.delete({
            where: { comentario_id: Number(id) }
        });
    }
}

export default new CommentService();