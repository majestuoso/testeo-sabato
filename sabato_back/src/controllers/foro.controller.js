import prisma from '../prisma.js';

// Crear un foro
export const crearForo = async (req, res) => {
    try {
        console.log("🟡 Datos recibidos desde frontend:", req.body);
        const { titulo, descripcion, creador_id } = req.body;
        
        const nuevoForo = await prisma.foro.create({
            data: {
                titulo,
                descripcion,
                creador_id: creador_id ? Number(creador_id) : null
            }
        });

        res.status(201).json({ foro_id: nuevoForo.foro_id });
    } catch (error) {
        console.error("❌ Error al crear foro:", error);
        res.status(500).json({ mensaje: 'Error al crear el foro', detalle: error.message });
    }
};

// Obtener todos los foros
export const obtenerForos = async (req, res) => {
    try {
        const foros = await prisma.foro.findMany({
            include: {
                usuario: true, // Incluye los datos del creador del foro
                comentario_foro: true // Opcional: si quieres listar la cantidad o los comentarios
            }
        });
        res.json(foros);
    } catch (error) {
        console.error("❌ Error al obtener foros:", error);
        res.status(500).json({ mensaje: 'Error al obtener los foros' });
    }
};

// Obtener un foro por ID
export const obtenerForo = async (req, res) => {
    try {
        const { id } = req.params;
        const foro = await prisma.foro.findUnique({
            where: { foro_id: parseInt(id) },
            include: {
                usuario: true
            }
        });

        if (!foro) {
            return res.status(404).json({ mensaje: "Foro no encontrado" });
        }

        res.json(foro);

    } catch (error) {
        console.error("❌ ERROR REAL:", error);
        res.status(500).json({
            mensaje: "Error al obtener el foro",
            detalle: error.message
        });
    }
};

// Actualizar un foro
export const actualizarForo = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        
        // Prisma lanzará error o devolverá registro si existe. Usamos update.
        const foroActualizado = await prisma.foro.update({
            where: { foro_id: parseInt(req.params.id) },
            data: { titulo, descripcion }
        }).catch(() => null);

        if (!foroActualizado)
            return res.status(404).json({ mensaje: 'Foro no encontrado' });

        res.json({ mensaje: 'Foro actualizado correctamente', foro: foroActualizado });

    } catch (error) {
        console.error("❌ Error al actualizar foro:", error);
        res.status(500).json({ mensaje: 'Error al actualizar el foro' });
    }
};

// Eliminar un foro
export const eliminarForo = async (req, res) => {
    try {
        const foroEliminado = await prisma.foro.delete({
            where: { foro_id: parseInt(req.params.id) }
        }).catch(() => null);

        if (!foroEliminado)
            return res.status(404).json({ mensaje: 'Foro no encontrado' });

        res.json({ mensaje: 'Foro eliminado correctamente' });

    } catch (error) {
        console.error("❌ Error al eliminar foro:", error);
        res.status(500).json({ mensaje: 'Error al eliminar el foro' });
    }
};

// Obtener foro con comentarios
export const obtenerForoConComentarios = async (req, res) => {
    try {
        const foro_id = parseInt(req.params.id);
        const foroConComentarios = await prisma.foro.findUnique({
            where: { foro_id },
            include: {
                usuario: true, // Creador del foro
                comentario_foro: {
                    include: {
                        usuario: true // Autor de cada comentario
                    }
                }
            }
        });

        if (!foroConComentarios)
            return res.status(404).json({ mensaje: 'Foro no encontrado' });

        res.json(foroConComentarios);

    } catch (error) {
        console.error("❌ Error al obtener foro con comentarios:", error);
        res.status(500).json({ mensaje: 'Error al obtener foro con comentarios' });
    }
};