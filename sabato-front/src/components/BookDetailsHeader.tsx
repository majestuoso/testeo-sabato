import React from "react";
import { Box, Typography } from "@mui/material";
import BookRatingSection from "./BookRatingSection";


const BookDetailsHeader = ({ book, coverImageSrc, authorStyle }) => {
  return (
    <Box display="flex" alignItems="flex-start" gap={2} mb={3}>
      <Box sx={{ position: "relative" }}>
        {coverImageSrc ? (
          <Box
            component="img"
            src={coverImageSrc}
            alt={`Cubierta de ${book.title || book.titulo}`}
            sx={{
              width: "100px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: 4,
            }}
          />
        ) : null}
      </Box>

      <Box flexGrow={1} textAlign="left" pt={1}>
        <Typography sx={authorStyle}>
          {book.title || book.titulo}
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ mb: 0.5 }}>
          {book.author || book.autor}
        </Typography>
        <BookRatingSection book={book}/>
      </Box>
    </Box>
  );
};

export default BookDetailsHeader;
