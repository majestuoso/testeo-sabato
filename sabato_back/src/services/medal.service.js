import prisma from '../prisma.js';

class MedalService {
    async obtenerTodas() {
        return await prisma.medalla.findMany();
    }

    async obtenerPorUsuario(usuario_id) {
        return await prisma.usuario_medalla.findMany({
            where: { usuario_id: Number(usuario_id) },
            include: { medalla: true }
        });
    }

    async otorgarMedalla(usuario_id, medalla_id) {
        return await prisma.usuario_medalla.create({
            data: {
                usuario_id: Number(usuario_id),
                medalla_id: Number(medalla_id)
            }
        });
    }
}

export default new MedalService();