import prisma from '../prisma.js';

class ListaLecturaService {
    async obtenerPorDocente(docente_id) {
        return await prisma.lista_lectura.findMany({
            where: { docente_id: Number(docente_id) },
            include: { lista: true }
        });
    }

    async crear(data) {
        return await prisma.lista_lectura.create({
            data: {
                lista_id: Number(data.lista_id),
                docente_id: Number(data.docente_id),
                descripcion: data.descripcion,
                nivel: data.nivel
            }
        });
    }

    async eliminar(lista_id, docente_id) {
        return await prisma.lista_lectura.delete({
            where: {
                lista_id_docente_id: {
                    lista_id: Number(lista_id),
                    docente_id: Number(docente_id)
                }
            }
        });
    }
}

export default new ListaLecturaService();