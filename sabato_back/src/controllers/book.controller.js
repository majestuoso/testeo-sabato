import bookService from '../services/book.service.js';

class BookController {
  async crear(req, res) {
    try {
      const nuevoLibro = await bookService.crear(req.body);
      res.status(201).json({ 
        mensaje: 'Libro creado correctamente',
        libro: nuevoLibro
      });
    } catch (error) {
      console.error('Error al crear libro:', error);
      res.status(500).json({ mensaje: 'Error al crear libro' });
    }
  }

  async obtenerCatalogo(req, res) {
    try {
      const libros = await bookService.obtenerTodos();
      res.json(libros);
    } catch (error) {
      console.error('Error al obtener catálogo:', error);
      res.status(500).json({ mensaje: 'Error al obtener libros' });
    }
  }

  async verDetalle(req, res) {
    const { id } = req.params;
    try {
      const libro = await bookService.obtenerPorId(id);

      if (!libro) {
        return res.status(404).json({ mensaje: 'Libro no encontrado' });
      }
      res.json(libro);
    } catch (error) {
      console.error('Error al obtener detalle:', error);
      res.status(500).json({ mensaje: 'Error al obtener detalle del libro' });
    }
  }

  async buscar(req, res) {
    try {
      const libros = await bookService.buscar(req.query);
      res.json(libros);
    } catch (error) {
      console.error('Error al buscar libros:', error);
      res.status(500).json({ mensaje: 'Error al buscar libros' });
    }
  }

  async actualizar(req, res) {
    const { id } = req.params;
    try {
      const libroActualizado = await bookService.actualizar(id, req.body);
      res.json({ mensaje: 'Libro actualizado correctamente', libro: libroActualizado });
    } catch (error) {
      console.error('Error al actualizar:', error);
      res.status(500).json({ mensaje: 'Error al actualizar libro' });
    }
  }

  async eliminar(req, res) {
    const { id } = req.params;
    try {
      await bookService.eliminar(id);
      res.status(204).send(); 
    } catch (error) {
      console.error('Error al eliminar:', error);
      res.status(500).json({ mensaje: 'Error al eliminar libro y sus dependencias' });
    }
  }

  async eliminacionLogica(req, res) {
    const { id } = req.params;
    try {
      res.json({ mensaje: 'Libro marcado como inactivo' });
    } catch (error) {
      console.error('Error al marcar como inactivo:', error);
      res.status(500).json({ mensaje: 'Error al marcar libro como inactivo' });
    }
  }
}

export default new BookController();