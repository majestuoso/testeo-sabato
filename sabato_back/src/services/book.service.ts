import prisma from '../prisma.js';

interface BookData {
    titulo: string;
    autor: string;
    descripcion?: string;
    genero?: string;
}

class BookService {
    async obtenerTodos() {
        return await prisma.libro.findMany();
    }

    async obtenerPorId(id: number | string) {
        return await prisma.libro.findUnique({
            where: { id: Number(id) } as any
        });
    }

    async crear(data: BookData) {
        return await prisma.libro.create({
            data
        });
    }

    async actualizar(id: number | string, data: Partial<BookData>) {
        return await prisma.libro.update({
            where: { id: Number(id) } as any,
            data
        });
    }

    async eliminar(id: number | string) {
        return await prisma.libro.delete({
            where: { id: Number(id) } as any
        });
    }
}

export default new BookService();