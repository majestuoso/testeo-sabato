import { opinionModel } from "../models/opinion.model.js";
import { medalModel } from '../models/medal.model.js';
import leoProfanity from "leo-profanity";

// Inicializamos los diccionarios de malas palabras
leoProfanity.loadDictionary("en");
leoProfanity.loadDictionary("es");

leoProfanity.add(["mierda", "pelotudo", "boludo", "Estupido"]);

class OpinionController {
  async getAllOpinions(req, res) {
    try {
      const opinions = await opinionModel.getAllOpinions();
      return res.status(200).json(opinions);
    } catch (error) {
      console.error("Error getting opinions:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getOpinionById(req, res) {
    try {
      const opinionId = parseInt(req.params.id, 10);
      if (isNaN(opinionId)) {
        return res.status(400).json({ error: "Invalid opinion ID" });
      }

      const opinion = await opinionModel.getOpinionById(opinionId);
      if (!opinion) {
        return res.status(404).json({ error: "Opinion not found" });
      }

      return res.status(200).json(opinion);
    } catch (error) {
      console.error("Error getting opinion by ID:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async createOpinion(req, res) {
    try {
      const { usuario_id, libro_id, calificacion, comentario } = req.body;

      if (!usuario_id || !libro_id || !calificacion || !comentario) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Moderación automática 
      const comentarioLimpio = leoProfanity.clean(comentario);

      const newOpinion = await opinionModel.createOpinion({
        usuario_id,
        libro_id,
        calificacion,
        comentario: comentarioLimpio,
      });

      console.log(newOpinion);
      

      // Verificar y asignar medallas después de crear el comentario del usuario
      await medalModel.verificarYAsignarMedallas(usuario_id);

      return res.status(201).json(newOpinion);
    } catch (error) {
      console.error("Error creating opinion:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  }


async updateOpinion(req, res) {
  try {
    const opinionId = parseInt(req.params.id, 10);
    if (isNaN(opinionId)) {
      return res.status(400).json({ error: "Invalid opinion ID" });
    }

    
    const existingOpinion = await opinionModel.getOpinionById(opinionId);
    if (!existingOpinion) {
      return res.status(404).json({ error: "Opinion not found" });
    }

    //  Verifica permisos: solo autor o admin
    const userId = req.userId;
    const userRole = req.userRole;

    if (userRole !== 3 && userId !== existingOpinion.usuario_id) {
      return res.status(403).json({ error: "Not authorized to modify this opinion" });
    }

    // Limpiar comentario si viene texto nuevo
    const updatedFields = req.body;
    if (updatedFields.comentario) {
      updatedFields.comentario = leoProfanity.clean(updatedFields.comentario);
    }

    const updatedOpinion = await opinionModel.updateOpinion(opinionId, updatedFields);
    return res.status(200).json(updatedOpinion);
  } catch (error) {
    console.error("Error updating opinion:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async deleteOpinion(req, res) {
  try {
    const opinionId = parseInt(req.params.id, 10);
    if (isNaN(opinionId)) {
      return res.status(400).json({ error: "Invalid opinion ID" });
    }

    const existingOpinion = await opinionModel.getOpinionById(opinionId);
    if (!existingOpinion) {
      return res.status(404).json({ error: "Opinion not found" });
    }

    // Solo el autor o admin pueden borrar
    const userId = req.userId;
    const userRole = req.userRole;

    if (userRole !== 3 && userId !== existingOpinion.usuario_id) {
      return res.status(403).json({ error: "Not authorized to delete this opinion" });
    }

    await opinionModel.deleteOpinion(opinionId);
    return res.status(204).end();
  } catch (error) {
    console.error("Error deleting opinion:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async getOpinionsByLibro(req, res) {
  try {
    const libroId = parseInt(req.params.libro_id, 10);
    if (isNaN(libroId)) {
      return res.status(400).json({ error: "Invalid libro ID" });
    }

    const sqlOpinions = await opinionModel.getOpinionsByLibro(libroId);
    return res.status(200).json(sqlOpinions);
  } catch (error) {
    console.error("Error getting opinions by libro:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

}

export default new OpinionController();
