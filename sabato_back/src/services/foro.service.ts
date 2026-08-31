import prisma from '../prisma.js';

const prismaClient = prisma as any;

interface CrearPostData {
    titulo: string;
    contenido: string;
}

class ForoService {
    async obtenerTodos() {
        return await prismaClient.foro_post.findMany({
            include: { usuario: true }
        });
    }

    async obtenerPorId(id: number | string) {
        return await prismaClient.foro_post.findUnique({
            where: { id: Number(id) },
            include: { usuario: true, respuestas: true }
        });
    }

    async crear(usuario_id: number | string, data: CrearPostData) {
        return await prismaClient.foro_post.create({
            data: {
                usuario_id: Number(usuario_id),
                ...data
            }
        });
    }
}

export default new ForoService();