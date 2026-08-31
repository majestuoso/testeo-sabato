import prisma from '../prisma.js';

interface UserData {
    nombre?: string;
    email?: string;
    password?: string;
}

class UserService {
    async obtenerTodos() {
        return await prisma.usuario.findMany({
            select: { id: true, nombre: true, email: true, createdAt: true }
        });
    }

    async obtenerPorId(id: number | string) {
        return await prisma.usuario.findUnique({
            where: { id: Number(id) } as any
        });
    }

    async actualizar(id: number | string, data: UserData) {
        return await prisma.usuario.update({
            where: { id: Number(id) } as any,
            data
        });
    }

    async eliminar(id: number | string) {
        return await prisma.usuario.delete({
            where: { id: Number(id) } as any
        });
    }
}

export default new UserService();