import prisma from '../prisma.js';

class ListaLecturaService {
    async obtenerPorUsuario(usuario_id: number | string) {
        return await prisma.lista_lectura.findMany({
            where: { docente_id: Number(usuario_id) },
            include: {
                lista: {
                    include: {
                        lista_libro: {
                            include: { libro: true }
                        }
                    }
                }
            }
        });
    }

    async agregarListaADocente(docente_id: number | string, lista_id: number | string, descripcion?: string, nivel?: string) {
        return await prisma.lista_lectura.create({
            data: {
                docente_id: Number(docente_id),
                lista_id: Number(lista_id),
                descripcion,
                nivel
            }
        });
    }
}

export default new ListaLecturaService();