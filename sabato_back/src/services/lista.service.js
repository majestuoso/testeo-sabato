import prisma from '../prisma.js';

class ListaService {
    async obtenerTodas() {
        return await prisma.lista.findMany({
            include: { lista_libro: { include: { libro: true } } }
        });
    }

    async obtenerPorId(id) {
        return await prisma.lista.findUnique({
            where: { lista_id: Number(id) },
            include: { lista_libro: { include: { libro: true } } }
        });
    }

    async crear(data) {
        return await prisma.lista.create({
            data: {
                nombre: data.nombre,
                descripcion: data.descripcion,
                tipo: data.tipo
            }
        });
    }

    async eliminar(id) {
        return await prisma.lista.delete({
            where: { lista_id: Number(id) }
        });
    }
}

export default new ListaService();