import React from "react";
import { Box, Typography, Rating, useTheme } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const ORANGE_COLOR = "#FF6633";

const BookRatingSection = ({ book }) => {
  const theme = useTheme(); // 👈 obtenemos theme internamente

  const ratingTextStyle = {
    fontSize: "1.8rem",
    fontWeight: 800,
    color: theme.palette.text.primary,
    lineHeight: 1,
  };

  return (
    <Box textAlign="left" mb={2}>
      <Box display="flex" alignItems="flex-end" gap={1}>
        <Typography sx={ratingTextStyle}>
          {(book.calificacion_promedio || 0).toFixed(1)}
        </Typography>
        <Rating
          value={book.calificacion_promedio || 0}
          precision={0.1}
          readOnly
          icon={<StarIcon sx={{ color: ORANGE_COLOR }} />}
          emptyIcon={<StarIcon sx={{ color: theme.palette.grey[300] }} />}
          size="small"
          sx={{ mb: 0.5 }}
        />
      </Box>
      <Typography variant="subtitle2" fontWeight="medium" color="text.secondary" sx={{ mt: 0.5 }}>
        Calificación Promedio
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block">
        ¿Qué piensan?
      </Typography>
    </Box>
  );
};

export default BookRatingSection;

