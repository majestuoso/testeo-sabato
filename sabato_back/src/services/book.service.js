import prisma from '../prisma.js';

class BookService {
    async obtenerTodos() {
        return await prisma.libro.findMany();
    }

    async obtenerPorId(id) {
        return await prisma.libro.findUnique({
            where: { libro_id: Number(id) }
        });
    }

    async crear(data) {
        return await prisma.libro.create({
            data: {
                libro_id: Number(data.libro_id),
                titulo: data.titulo,
                autor: data.autor,
                genero: data.genero,
                descripcion: data.descripcion,
                portada_url: data.portada_url,
                nivel_educativo: data.nivel_educativo
            }
        });
    }

    async buscar(filtrosQuery) {
        const { q, genero, nivel_educativo } = filtrosQuery;
        const filtros = {};

        if (q) {
            filtros.OR = [
                { titulo: { contains: q, mode: 'insensitive' } },
                { autor: { contains: q, mode: 'insensitive' } }
            ];
        }
        if (genero) filtros.genero = genero;
        if (nivel_educativo) filtros.nivel_educativo = nivel_educativo;

        return await prisma.libro.findMany({ where: filtros });
    }

    async actualizar(id, data) {
        return await prisma.libro.update({
            where: { libro_id: Number(id) },
            data
        });
    }

    async eliminar(id) {
        return await prisma.libro.delete({
            where: { libro_id: Number(id) }
        });
    }
}

export default new BookService();