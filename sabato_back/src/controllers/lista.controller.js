import listaService from '../services/lista.service.js';

class ListaController {
    async obtenerTodas(req, res) {
        try {
            const listas = await listaService.obtenerTodas();
            res.json(listas);
        } catch (error) {
            console.error('Error al obtener listas:', error);
            res.status(500).json({ mensaje: 'Error al obtener las listas' });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const lista = await listaService.obtenerPorId(id);

            if (!lista) {
                return res.status(404).json({ mensaje: 'Lista no encontrada' });
            }
            res.json(lista);
        } catch (error) {
            console.error('Error al obtener la lista:', error);
            res.status(500).json({ mensaje: 'Error al obtener el detalle de la lista' });
        }
    }

    async crear(req, res) {
        try {
            const nuevaLista = await listaService.crear(req.body);
            res.status(201).json({
                mensaje: 'Lista creada correctamente',
                lista: nuevaLista
            });
        } catch (error) {
            console.error('Error al crear lista:', error);
            res.status(500).json({ mensaje: 'Error al crear la lista' });
        }
    }

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            await listaService.eliminar(id);
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar lista:', error);
            res.status(500).json({ mensaje: 'Error al eliminar la lista' });
        }
    }
}

export default new ListaController();