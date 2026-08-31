import { Box, Typography } from "@mui/material";
import BookCard from "./BookCard";

export default function BookListSection({ books, handleFavoriteToggle, handleVerMas }) {
  return (
    <>
      <Typography variant="h4" fontWeight="bold" color="secondary" mt={3} mb={1}>
        Destacados
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          width: "100%",
        }}
      >
        {books.map((book) => (
          <BookCard
            key={book.libro_id}
            image={book.portada_url}
            autor={book.autor}
            gender={book.genero}
            title={book.titulo}
            rating={book.calificacion_promedio}
            progress={book.progress}
            isFavorite={book.isFavorite}
            onFavoriteToggle={() => handleFavoriteToggle(book.id || book.libro_id, false)}
            // bookId={book.id} // Esto esta de mas
            libro_id={book.libro_id}
            onVerMas={() => handleVerMas(book.libro_id)}
          />
        ))}
      </Box>
    </>
  );
}