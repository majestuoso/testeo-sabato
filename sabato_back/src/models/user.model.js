
import { db,pgp } from "../db/connect/db.js";
import bcrypt from 'bcrypt';

class UserModel {

     async getAllUsers() {
        
        const sqlQuery = `
            SELECT
                u.usuario_id,
                u.nombre,
                u.email,
                r.nombre_rol AS rol,
                u.fecha_registro,
                u.perfil_completo,
                u.avatar_url,
                u.nivel_educativo
            FROM
                usuario u
            INNER JOIN
                rol r ON u.rol_id = r.rol_id
            ORDER BY u.usuario_id;
        `;      
        try {
            
            const users = await db.any(sqlQuery); 
            return users;
            
        } catch (error) {       
            console.error("Error UserModel.getAllUsers:", error);
            throw new Error("Failed to retrieve users.");
        }
    }
    async createUser(userData) {
        const saltRounds = 10;
        const { 
            nombre, 
            email, 
            contrasena, 
            rol_id,
            perfil_completo = false, 
            avatar_url = null, 
            nivel_educativo = null 
        } = userData;
  
        const fecha_registro = new Date(); 
        
        try {
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);         
            const newUser = await db.one(`
                INSERT INTO 
                    usuario (nombre, email, contrasena, rol_id, fecha_registro, perfil_completo, avatar_url, nivel_educativo) 
                VALUES 
                    ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING 
                    usuario_id, nombre, email, fecha_registro, rol_id;
            `, [
                nombre, 
                email, 
                hashedPassword, 
                rol_id, 
                fecha_registro,        
                perfil_completo, 
                avatar_url, 
                nivel_educativo
            ]);

            return newUser; 

        } catch (error) {
            console.error("Error en UserModel.createUser:", error);
            throw error;      
        }
    }
    async updateUser(userId, userData) {
        
        const { 
            nombre, 
            email, 
            contrasena,
            rol_id,     
            perfil_completo, 
            avatar_url, 
            nivel_educativo 
        } = userData;
        try{

            if (Object.keys(userData).length === 0) {
             throw new Error("No data provided for update.");
            }
            const setClause = pgp.helpers.sets(userData, null, 'usuario');
            const sqlQuery = `
            UPDATE 
                usuario
            SET 
                ${setClause}
            WHERE 
                usuario_id = $1
            RETURNING 
                usuario_id, nombre, email, rol_id, perfil_completo, fecha_registro, avatar_url, nivel_educativo;
        `;
        const updatedUser = await db.oneOrNone(sqlQuery, [userId]);

        if(!updatedUser) {
            throw new Error(`User ID ${userId} not found.`);
        }
        return updatedUser 
        }catch (error) {
            console.error("Error in UserModel.updateUser:", error.message);
            throw error;
        }
     
    }
    async getUserById(userId) {
        const sqlQuery = `
            SELECT
                u.usuario_id,
                u.nombre,
                u.email,
                u.fecha_registro,
                u.perfil_completo,
                u.avatar_url,
                u.nivel_educativo,
                r.nombre_rol AS rol
            FROM
                usuario u
            INNER JOIN
                rol r ON u.rol_id = r.rol_id
            WHERE
                u.usuario_id = $1; 
        `;    
        try {
            const user = await db.oneOrNone(sqlQuery, [userId]);
            
            return user;
            
        } catch (error) {
            console.error(error.message);
            throw new Error("Failed to retrieve user from the database");
        }
    }
    async deleteUser(userId) {
        try {
            const result = await db.result(`
                DELETE FROM 
                    usuario
                WHERE 
                    usuario_id = $1
            `, [userId]);

            if (result.rowCount === 0) {
                throw new Error(`User ID ${userId} not found.`);
            }

            return true; 

        } catch (error) {
            console.error(`Error UserModel.deleteUser (ID: ${userId}):`, error.message);
            throw new Error("Failed to delete user from the database."); 
        }
    }

    
}
export const userModel = new UserModel();

