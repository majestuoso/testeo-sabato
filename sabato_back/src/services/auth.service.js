import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';

class AuthService {
    async login(email, contrasena) {
        const user = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!user) {
            throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!passwordMatch) {
            throw new Error("Invalid email or password");
        }

        const payload = {
            usuario_id: user.usuario_id,
            nombre: user.nombre,
            rol_id: user.rol_id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        return {
            message: "Inicio de sesión exitoso.",
            token,
            userId: user.usuario_id,
            rol: user.rol_id
        };
    }

    async register(data) {
        const { email, nombre, contrasena, rol_id, nivel_educativo } = data;

        const existingUser = await prisma.usuario.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new Error("El email ya está registrado.");
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const newUser = await prisma.usuario.create({
            data: {
                nombre,
                email,
                contrasena: hashedPassword,
                rol_id: rol_id ? Number(rol_id) : null,
                nivel_educativo: nivel_educativo || null,
                perfil_completo: false
            }
        });
        
        return {
            usuario_id: newUser.usuario_id,
            email: newUser.email
        };
    }
}

export default new AuthService();