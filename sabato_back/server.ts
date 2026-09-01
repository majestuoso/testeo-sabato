import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

/* Importaciones relativas con extensión .js necesarias bajo NodeNext */
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

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

/* Rutas de la API (v1 y fallback sin prefijo) */
app.use('/api/v1/auth', authRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/v1/users', userRoutes);
app.use('/api/users', userRoutes);

app.use('/api/v1/books', bookRoutes);
app.use('/api/books', bookRoutes);

app.use('/api/v1/comentarios', comentarioRoutes);
app.use('/api/comentarios', comentarioRoutes);

app.use('/api/v1/favoritos', favoriteRoutes);
app.use('/api/favoritos', favoriteRoutes);

app.use('/api/v1/foro', foroRoutes);
app.use('/api/foro', foroRoutes);

app.use('/api/v1/listas', listaRoutes);
app.use('/api/listas', listaRoutes);

app.use('/api/v1/lista-lectura', listaLecturaRoutes);
app.use('/api/lista-lectura', listaLecturaRoutes);

app.use('/api/v1/medallas', medalRoutes);
app.use('/api/medallas', medalRoutes);

app.use('/api/v1/opiniones', opinionRoutes);
app.use('/api/opiniones', opinionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});