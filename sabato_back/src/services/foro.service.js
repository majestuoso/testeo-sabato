import prisma from '../prisma.js';

class ForoService {
    async obtenerTodos() {
        return await prisma.foro.findMany({
            include: { usuario: { select: { nombre: true } } }
        });
    }

    async obtenerPorId(id) {
        return await prisma.foro.findUnique({
            where: { foro_id: Number(id) },
            include: { 
                usuario: { select: { nombre: true } },
                comentario_foro: { include: { usuario: { select: { nombre: true, avatar_url: true } } } }
            }
        });
    }

    async crear(data) {
        return await prisma.foro.create({
            data: {
                titulo: data.titulo,
                descripcion: data.descripcion,
                creador_id: Number(data.creador_id)
            }
        });
    }

    async eliminar(id) {
        return await prisma.foro.delete({
            where: { foro_id: Number(id) }
        });
    }
}

export default new ForoService();