import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extendemos la interfaz de Request para que TS no marque error con req.userId y req.userRole
export interface AuthenticatedRequest extends Request {
  userId?: string | number;
  userRole?: number;
  headers: Request["headers"];
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as {
      usuario_id?: string | number;
      id?: string | number;
      rol_id?: number;
    };

    req.userId = decoded.usuario_id || decoded.id;
    req.userRole = decoded.rol_id || 1;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/**
 * Middleware de Autorización: Verifica si el usuario autenticado tiene el rol requerido.
 */
export const requireRole = (requiredRole: number) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRoleNumber = Number(req.userRole);
    if (!userRoleNumber || userRoleNumber !== requiredRole) {
      return res
        .status(403)
        .json({ error: "Acceso denegado. Permisos insuficientes." });
    }
    next();
  };
};
