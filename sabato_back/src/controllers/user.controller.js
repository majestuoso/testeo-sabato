import prisma from '../prisma.js';
import bcrypt from 'bcrypt';

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await prisma.usuario.findMany();
            res.status(200).json(users);
        } catch (error) {
            console.error("Error getting users:", error.message);
            res.status(500).json({ error: "Database connection not established" });
        }
    }

    async createUser(req, res) {
        try {
            const { nombre, email, contrasena, rol_id, nivel_educativo, perfil_completo } = req.body;
            
            if(!nombre || !email || !contrasena || !rol_id) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            // Encriptar la contraseña antes de guardarla con Prisma
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

            const newUser = await prisma.usuario.create({
                data: {
                    nombre,
                    email,
                    contrasena: hashedPassword,
                    rol_id: Number(rol_id),
                    nivel_educativo: nivel_educativo || null,
                    perfil_completo: perfil_completo !== undefined ? perfil_completo : false
                }
            });

            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error creating user:", error.message);
            if (error.code === 'P2002') {
                return res.status(409).json({ error: "Email already exists" });
            }
            res.status(500).json({ error: "Database connection not established" });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = parseInt(req.params.id, 10);
            const { nombre, email, contrasena, rol_id, nivel_educativo, perfil_completo } = req.body;

            if (isNaN(userId)) {
                return res.status(400).json({ error: "Invalid ID format" });
            }

            // Verificamos si el usuario existe antes de actualizar
            const existingUser = await prisma.usuario.findUnique({
                where: { usuario_id: userId }
            });

            if (!existingUser) {
                return res.status(404).json({ error: "User not found" });
            }

            // Si se envía una contraseña nueva, la encriptamos
            let hashedPassword = undefined;
            if (contrasena) {
                const saltRounds = 10;
                hashedPassword = await bcrypt.hash(contrasena, saltRounds);
            }

            const updatedUser = await prisma.usuario.update({
                where: { usuario_id: userId },
                data: {
                    ...(nombre && { nombre }),
                    ...(email && { email }),
                    ...(hashedPassword && { contrasena: hashedPassword }),
                    ...(rol_id && { rol_id: Number(rol_id) }),
                    ...(nivel_educativo !== undefined && { nivel_educativo }),
                    ...(perfil_completo !== undefined && { perfil_completo })
                }
            });

            return res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error.message);
            return res.status(500).json({ error: "Internal server error: Failed to process update." });
        }
   }

   async deleteUser(req, res) {
        try {
            const userId = parseInt(req.params.id, 10);
            if(isNaN(userId)) {
                return res.status(400).json({ error: "Invalid user ID" });
            }

            const deletedUser = await prisma.usuario.delete({
                where: { usuario_id: userId }
            }).catch(() => null);

            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.status(204).end();
        } catch (error) {
            console.error("Error deleting user:", error.message);
            return res.status(500).json({ error: "Internal server error"});
        }
   }

    async getUserById(req, res) {
          try {
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                return res.status(400).json({ error: "Invalid user ID" });
            }

            const user = await prisma.usuario.findUnique({
                where: { usuario_id: userId }
            });

            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({ error: `User not found` });
            }
        } catch (error) {
            console.error("Error getting user by ID:", error.message);
            res.status(500).json({ error: "Internal server error" }); 
        }  
    }
}

export default new UserController();