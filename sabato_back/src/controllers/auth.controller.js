import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js'; // Ajusta la ruta si tu prisma.js está en otro nivel de carpetas

class AuthController {
    async login(req, res) {
        const { email, contrasena } = req.body;
        
        if (!email || !contrasena) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        try {
            const user = await prisma.usuario.findUnique({
                where: { email: email }
            });

            if (!user) {
                return res.status(401).json({ error: "User not found" });
            }

            const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);

            if (!passwordMatch) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const payload = {
                usuario_id: user.usuario_id,
                nombre: user.nombre,
                rol_id: user.rol_id
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            return res.status(200).json({ 
                message: "Inicio de sesión exitoso.",
                token: token,
                userId: user.usuario_id,
                rol: user.rol_id 
            });
        } catch (error) {
            console.error("Excepción atrapada durante el login:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    async register(req, res) {
        try {     
            const { email, nombre, contrasena, rol_id, nivel_educativo } = req.body;    

            const existingUser = await prisma.usuario.findUnique({
                where: { email: email }
            });

            if (existingUser) {        
                return res.status(409).json({ error: "El email ya está registrado. Por favor, inicia sesión o usa otro correo." });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

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
            
            return res.status(201).json({
                message: "Usuario registrado con éxito.",
                usuario: {
                    usuario_id: newUser.usuario_id,
                    email: newUser.email,           
                }
            });

        } catch (error) {        
            console.error("Error al registrar usuario:", error);
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }
}

export default new AuthController();