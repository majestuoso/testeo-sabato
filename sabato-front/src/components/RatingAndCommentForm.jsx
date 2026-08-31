import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Rating,
    IconButton,
    DialogActions,
    Alert,
} from '@mui/material';

// Iconos de MUI
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Importar el tema global
import theme from '../theme/theme';

/**
  * Componente que muestra la interfaz de calificación y comentario
  * con el estilo del mockup (teclado virtual no incluido, solo el formulario).
  * @param {function} onBack Función para volver a la vista anterior.
  * @param {function} onSubmit Función para manejar el envío de la calificación y el comentario.
  * @param {boolean} hasUserCommented Indica si el usuario ya ha comentado para mostrar mensaje alternativo.
  */
export default function RatingAndCommentForm({ onBack, onSubmit, hasUserCommented = false }) {
    const [ratingValue, setRatingValue] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const maxCommentLength = 500;

    // Función para manejar el envío del formulario
    const handleSubmit = async () => {
        setError('');

        if (ratingValue === 0) {
            setError('Por favor, selecciona una calificación.');
            return;
        }

        if (commentText.trim().length === 0) {
            setError('Por favor, agrega un comentario.');
            return;
        }

        if (commentText.length > maxCommentLength) {
            setError(`El comentario no puede exceder ${maxCommentLength} caracteres.`);
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit({
                rating: ratingValue,
                text: commentText.trim()
            });
        } catch (err) {
            setError('Error al enviar la calificación. Inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Si el usuario ya ha comentado, mostrar mensaje alternativo
    if (hasUserCommented) {
        return (
            <Box
                sx={{
                    p: 3,
                    maxWidth: 400,
                    margin: '0 auto',
                    bgcolor: 'white',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    textAlign: 'center'
                }}
            >
                {/* HEADER Y BOTÓN DE RETROCESO */}
                <Box display="flex" alignItems="center" mb={3}>
                    <IconButton onClick={onBack} color="inherit" sx={{ mr: 1 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5" fontWeight="bold">
                        Ya has calificado
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box textAlign="center">
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            ✅ Ya has enviado tu calificación y comentario para este libro.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Cada usuario puede enviar solo una calificación por libro.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                p: 3,
                maxWidth: 700,
                margin: '0 auto',
                bgcolor: 'white',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                gap: 3
            }}
        >
            {/* 1. HEADER Y BOTÓN DE RETROCESO */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={3}
                bgcolor="#f5f5f5"
                borderRadius={2}
                boxShadow="inset 0 1px 3px rgba(0,0,0,0.05)"
                sx={{ maxWidth: 700, mx: 'auto', mb: 3 }}
            >
                <IconButton onClick={onBack} color="inherit" sx={{ mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" fontWeight="bold">
                    Calificar
                </Typography>
            </Box>

            {/* 2. SISTEMA DE RATING (Estrellas) */}
            <Box
                textAlign="center"
                p={3}
                bgcolor="#f5f5f5"
                borderRadius={2}
                boxShadow="inset 0 1px 3px rgba(0,0,0,0.05)"
                sx={{ maxWidth: 700, mx: 'auto' }}
            >
                <Typography variant="h6" gutterBottom>
                    ¿Cuántas estrellas le das?
                </Typography>
                <Rating
                    name="book-rating"
                    value={ratingValue}
                    onChange={(event, newValue) => {
                        setRatingValue(newValue);
                        setError(''); // Limpiar error al cambiar rating
                    }}
                    size="large"
                    // Estrellas personalizadas con el color del botón del tema global
                    icon={<StarIcon fontSize="inherit" sx={{ color: theme.palette.button.main }} />}
                    emptyIcon={<StarIcon fontSize="inherit" style={{ opacity: 0.2 }} />}
                    sx={{
                        fontSize: '2.5rem',
                        '& .MuiRating-icon': {
                            mx: 0.5 // Espacio entre estrellas
                        }
                    }}
                    aria-label="Calificación del libro"
                />
            </Box>

            {/* 3. CAMPO DE COMENTARIO */}
            <Box
                textAlign="center"
                p={3}
                bgcolor="#f5f5f5"
                borderRadius={2}
                boxShadow="inset 0 1px 3px rgba(0,0,0,0.05)"
                sx={{ maxWidth: 700, mx: 'auto' }}
            >
                <Typography variant="h6" gutterBottom>
                    ¿Qué opinas del libro?
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    label="Agregar un comentario"
                    value={commentText}
                    onChange={(e) => {
                        setCommentText(e.target.value);
                        setError(''); // Limpiar error al escribir
                    }}
                    inputProps={{
                        maxLength: maxCommentLength,
                        'aria-describedby': 'comment-helper-text'
                    }}
                    helperText={`${commentText.length}/${maxCommentLength} caracteres`}
                    InputProps={{
                        startAdornment: (
                             <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                                💬
                            </Typography>
                        ),
                    }}
                    aria-label="Comentario del libro"
                />
            </Box>

            {/* 4. MENSAJE DE ERROR */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* 5. BOTÓN DE ENVÍO (Simulación del botón 'Go' o 'Publicar') */}
            {/* Usamos DialogActions para simular el área de botones en la parte inferior */}
            <Box sx={{ maxWidth: 700, mx: 'auto', mb: 2 }}>
                <DialogActions sx={{ p: 0, justifyContent: 'center' }}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        sx={{
                            width: '100%',
                            py: 1.5,
                            fontWeight: 'bold',
                            backgroundColor: theme.palette.button.main,
                            '&:hover': {
                                backgroundColor: theme.palette.button.main,
                                opacity: 0.9,
                            },
                            boxShadow: `0 4px 10px rgba(${theme.palette.button.main.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0.4)`,
                        }}
                    >
                        {isSubmitting ? 'Enviando...' : 'Enviar Calificación'}
                    </Button>
                </DialogActions>
            </Box>
        </Box>
    );
}