import jwt from 'jsonwebtoken';

    export const verifyToken = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader ||!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const token = authHeader.split(' ')[1]; // Extrae solo el token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.userId = decoded.usuario_id||decoded.id;
            req.userRole = decoded.rol_id||1;

      
        next();
    }catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
/**
 * Middleware de Autorización: Verifica si el usuario autenticado tiene el rol requerido.
 * * Se usa después de verifyToken.
 * @param {number} requiredRole - El ID del rol necesario para acceder (ej: 1, 2, 99).
 */
export const requireRole = (requiredRole) => {  
    return (req, res, next) => {
        const userRoleNumber = Number(req.userRole);    
        if (!userRoleNumber || userRoleNumber !== requiredRole) {
            return res.status(403).json({ error: "Acceso denegado. Permisos insuficientes." });
        }
        next();
    };
};
