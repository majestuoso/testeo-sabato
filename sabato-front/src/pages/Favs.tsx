import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useFavorites } from "../hooks/useFavorites";

import LibroImage from "../assets/libro.jpg";
import AppHeader from "../components/AppHeader";
import BookCard from "../components/BookCard";
import SideMenu from "../components/SideMenu";

export default function Favs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { favoriteBooks, loading, error, toggleFavorite } = useFavorites();

  // Determina si un libro es favorito
  const isBookFavorite = (libro_id: number | string) =>
    favoriteBooks.some((book) => String(book.libro_id) === String(libro_id));

  // Handler para agregar/quitar favorito
  const handleFavoriteToggle = async (libro_id: number | string) => {
    const currentlyFavorite = isBookFavorite(libro_id);
    await toggleFavorite(libro_id, currentlyFavorite);
  };

  if (loading) {
    return (
      <Box
        py={2}
        px={1}
        sx={{ width: "100%", maxWidth: 1000, margin: "0 auto" }}
      >
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          mt={5}
        >
          Cargando favoritos...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        py={2}
        px={1}
        sx={{ width: "100%", maxWidth: 1000, margin: "0 auto" }}
      >
        <Typography variant="h6" color="error" textAlign="center" mt={5}>
          Error al cargar favoritos: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      py={2}
      px={1}
      sx={{
        width: "100%",
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      <AppHeader
        onMenuClick={() => setMenuOpen(true)}
        title="Mis Favoritos"
        subtitle={`Tienes ${favoriteBooks.length} libros favoritos`}
      />

      {/* Drawer lateral */}
      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        active="Favoritos"
      />

      {/* Titulo principal */}
      <Typography variant="h5" fontWeight="bold" color="secondary" mb={2}>
        Tu Colección Favorita
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {/* Mapeo de la lista de favoritos */}
        {favoriteBooks.map((book: any) => {
          const libroId = book.libro_id || book.id || 0;
          return (
            <BookCard
              key={libroId}
              image={book.portada_url || book.imagen || LibroImage}
              title={book.titulo || book.title || "Sin título"}
              autor={book.autor || book.author || "Autor desconocido"}
              gender={book.genero || book.gender || ""}
              description={book.descripcion || book.description || ""}
              rating={Number(book.calificacion_promedio || book.rating || 0)}
              isFavorite={isBookFavorite(libroId)}
              onFavoriteToggle={() => handleFavoriteToggle(libroId)}
              libro_id={libroId}
            />
          );
        })}

        {/* Mensaje si la lista está vacía */}
        {favoriteBooks.length === 0 && (
          <Typography variant="subtitle1" color="text.secondary" mt={3}>
            Aún no tienes libros marcados como favoritos.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
