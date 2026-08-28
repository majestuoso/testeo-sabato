import listaLecturaService from '../services/listaLectura.service.js';

class ListaLecturaController {
    async obtenerPorDocente(req, res) {
        try {
            const { docente_id } = req.params;
            const listas = await listaLecturaService.obtenerPorDocente(docente_id);
            res.json(listas);
        } catch (error) {
            console.error('Error al obtener listas de lectura:', error);
            res.status(500).json({ mensaje: 'Error al obtener las listas de lectura del docente' });
        }
    }

    async crear(req, res) {
        try {
            const nuevaListaLectura = await listaLecturaService.crear(req.body);
            res.status(201).json({
                mensaje: 'Lista de lectura asignada correctamente',
                listaLectura: nuevaListaLectura
            });
        } catch (error) {
            console.error('Error al crear lista de lectura:', error);
            res.status(500).json({ mensaje: 'Error al crear la lista de lectura' });
        }
    }

    async eliminar(req, res) {
        try {
            const { lista_id, docente_id } = req.params;
            await listaLecturaService.eliminar(lista_id, docente_id);
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar lista de lectura:', error);
            res.status(500).json({ mensaje: 'Error al eliminar la lista de lectura' });
        }
    }
}

export default new ListaLecturaController();