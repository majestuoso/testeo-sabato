import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import bookRoutes from './src/routes/book.routes.js';
import comentarioRoutes from './src/routes/comentario.routes.js';
import favoriteRoutes from './src/routes/favorite.routes.js';
import foroRoutes from './src/routes/foro.routes.js';
import listaRoutes from './src/routes/lista.routes.js';
import listaLecturaRoutes from './src/routes/listaLectura.routes.js';
import medalRoutes from './src/routes/medal.routes.js';
import opinionRoutes from './src/routes/opinion.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* Rutas de la API */
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/favoritos', favoriteRoutes);
app.use('/api/foro', foroRoutes);
app.use('/api/listas', listaRoutes);
app.use('/api/lista-lectura', listaLecturaRoutes);
app.use('/api/medallas', medalRoutes);
app.use('/api/opiniones', opinionRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});