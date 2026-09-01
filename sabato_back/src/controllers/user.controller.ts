import { Request, Response } from 'express';

export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    return res.json([]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    return res.json({ id });
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    return res.json({ mensaje: `Usuario ${id} actualizado correctamente` });
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    return res.json({ mensaje: `Usuario ${id} eliminado correctamente` });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};