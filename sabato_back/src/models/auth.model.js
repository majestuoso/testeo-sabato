import { db, pgp } from "../db/connect/db.js";

class AuthModel {
    async getUserByEmail(email) {
        try {
            const user = await db.oneOrNone(`
                SELECT
                    usuario_id,
                    nombre,
                    email,
                    contrasena,
                    rol_id
                    FROM
                    usuario
                WHERE
                    email = $1
            `, [email]);
            return user;
        } catch (error) {
            console.error("Error in AuthModel.getUserByEmail:", error.message);
            throw new Error("Failed to retrieve user by email");
        }
    }
}

export default new AuthModel();