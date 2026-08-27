import e from "express";
import authModel from "../models/auth.model.js";
import { userModel } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
    async login(req, res) {
        const { email, contrasena } = req.body;
        if(!email || !contrasena) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        try {
            const user = await authModel.getUserByEmail(req.body.email);
            if (!user) {
                return res.status(401).json({ error: "Invalid email or password" });
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
        }catch (error) {
            console.error("Error during login:", error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async register(req, res) {
        try {     
            const { email } = req.body;    
            const existingUser = await authModel.getUserByEmail(email);
            if (existingUser) {        
                return res.status(409).json({ error: "El email ya está registrado. Por favor, inicia sesión o usa otro correo." });
            }
            const newUser = await userModel.createUser(req.body);
            
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