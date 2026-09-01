import prisma from '../prisma.js';

interface CrearPostData {
    titulo: string;
    descripcion?: string;
}

class ForoService {
    async obtenerTodos() {
        return await prisma.foro.findMany({
            include: { 
                usuario: true // Incluye la información del creador del foro
            }
        });
    }

    async obtenerPorId(id: number | string) {
        return await prisma.foro.findUnique({
            where: { foro_id: Number(id) }, // Tu llave primaria es 'foro_id'
            include: { 
                usuario: true, 
                comentario_foro: true // La relación con comentarios se llama 'comentario_foro'
            }
        });
    }

    async crear(creador_id: number | string, data: CrearPostData) {
        return await prisma.foro.create({
            data: {
                creador_id: Number(creador_id),
                titulo: data.titulo,
                descripcion: data.descripcion
            }
        });
    }
}

export default new ForoService();