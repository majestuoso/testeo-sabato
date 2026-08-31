import prisma from '../prisma.js';

interface RegisterData {
    nombre: string;
    email: string;
    contrasena: string;
    rol_id?: number;
    avatar_url?: string;
    nivel_educativo?: string;
}

class AuthService {
    async buscarPorEmail(email: string) {
        return await prisma.usuario.findUnique({
            where: { email }
        });
    }

    async registrar(data: RegisterData) {
        return await prisma.usuario.create({
            data: {
                nombre: data.nombre,
                email: data.email,
                contrasena: data.contrasena,
                rol_id: data.rol_id,
                avatar_url: data.avatar_url,
                nivel_educativo: data.nivel_educativo
            }
        });
    }
}

export default new AuthService();