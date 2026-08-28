import prisma from '../prisma.js';

class OpinionService {
    async obtenerPorLibro(libro_id) {
        return await prisma.opinion.findMany({
            where: { libro_id: Number(libro_id) },
            include: { usuario: { select: { nombre: true, avatar_url: true } } }
        });
    }

    async crear(data) {
        return await prisma.opinion.create({
            data: {
                usuario_id: Number(data.usuario_id),
                libro_id: Number(data.libro_id),
                calificacion: Number(data.calificacion),
                comentario: data.comentario
            }
        });
    }

    async eliminar(id) {
        return await prisma.opinion.delete({
            where: { opinion_id: Number(id) }
        });
    }
}

export default new OpinionService();