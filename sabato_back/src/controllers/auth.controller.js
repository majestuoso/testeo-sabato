import authService from '../services/auth.service.js';

class AuthController {
    async login(req, res) {
        const { email, contrasena } = req.body;
        
        if (!email || !contrasena) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        try {
            const resultado = await authService.login(email, contrasena);
            return res.status(200).json(resultado);
        } catch (error) {
            if (error.message === "User not found" || error.message === "Invalid email or password") {
                return res.status(401).json({ error: error.message });
            }
            console.error("Excepción atrapada durante el login:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    async register(req, res) {
        try {     
            const nuevoUsuario = await authService.register(req.body);
            
            return res.status(201).json({
                message: "Usuario registrado con éxito.",
                usuario: nuevoUsuario
            });

        } catch (error) {        
            if (error.message === "El email ya está registrado.") {
                return res.status(409).json({ error: error.message });
            }
            console.error("Error al registrar usuario:", error);
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }
}

export default new AuthController();