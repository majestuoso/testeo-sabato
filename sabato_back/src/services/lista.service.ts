// src/services/lista.service.ts
import prisma from '../prisma.js';

class ListaService {
    async obtenerPorUsuario(usuario_id: number | string) {
        return await prisma.lista.findMany({
            where: {
                lista_lectura: {
                    some: { docente_id: Number(usuario_id) }
                }
            }
        });
    }

    async crear(nombre: string, descripcion?: string, tipo?: string) {
        return await prisma.lista.create({
            data: {
                nombre,
                descripcion,
                tipo
            }
        });
    }
}

export default new ListaService();