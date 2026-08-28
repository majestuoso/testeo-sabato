import prisma from '../prisma.js';

class UserService {
    async obtenerTodos() {
        return await prisma.usuario.findMany({
            select: {
                usuario_id: true,
                nombre: true,
                email: true,
                rol_id: true,
                fecha_registro: true,
                perfil_completo: true,
                avatar_url: true,
                nivel_educativo: true
            }
        });
    }

    async obtenerPorId(id) {
        return await prisma.usuario.findUnique({
            where: { usuario_id: Number(id) },
            include: { rol: true }
        });
    }

    async actualizar(id, data) {
        return await prisma.usuario.update({
            where: { usuario_id: Number(id) },
            data
        });
    }

    async eliminar(id) {
        return await prisma.usuario.delete({
            where: { usuario_id: Number(id) }
        });
    }
}

export default new UserService();