import prisma from '../prisma.js';

const prismaClient = prisma as any;

class CommentService {
    async obtenerPorLibro(libro_id: number | string) {
        return await prismaClient.comentario.findMany({
            where: { libro_id: Number(libro_id) },
            include: { usuario: true }
        });
    }

    async crear(usuario_id: number | string, libro_id: number | string, contenido: string) {
        return await prismaClient.comentario.create({
            data: {
                usuario_id: Number(usuario_id),
                libro_id: Number(libro_id),
                contenido
            }
        });
    }

    async eliminar(id: number | string, usuario_id: number | string) {
        return await prismaClient.comentario.deleteMany({
            where: {
                id: Number(id),
                usuario_id: Number(usuario_id)
            }
        });
    }
}

export default new CommentService();