import prisma from '../prisma.js';

class OpinionService {
    async obtenerPorLibro(libro_id: number | string) {
        return await prisma.opinion.findMany({
            where: { libro_id: Number(libro_id) },
            include: { usuario: true }
        });
    }

    async crear(usuario_id: number | string, libro_id: number | string, calificacion: number, texto?: string) {
        return await prisma.opinion.create({
            data: {
                usuario_id: Number(usuario_id),
                libro_id: Number(libro_id),
                calificacion: Number(calificacion),
                texto
            }
        });
    }
}

export default new OpinionService();