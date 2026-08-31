import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';

const ForumForm = ({ forumToEdit, title, onSave, onCancel }) => {
    const [titulo, setTitulo] = useState(forumToEdit?.titulo || '');
    const [descripcion, setDescripcion] = useState(forumToEdit?.descripcion || '');
    useEffect(() => {
        if (forumToEdit) {
            setTitulo(forumToEdit.titulo || '');
            setDescripcion(forumToEdit.descripcion || '');
        } else {
            // Limpiar estados si estamos en modo creación
            setTitulo('');
            setDescripcion('');
        }
    }, [forumToEdit]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!titulo || !descripcion) return;
        const isEditing = !!forumToEdit;

        const dataToSend = {
            titulo,
            descripcion,
            // 3. Incluir el ID si estamos editando (necesario para la API PUT)
            ...(isEditing && { foro_id: forumToEdit.foro_id }),

            // Nota: El creador_id es manejado por el Dashboard solo en el POST de creación.
        };

        // Llama al handler unificado (handleSaveForum) en Dashboard
        onSave(dataToSend);
    };

    return (
        <Paper sx={{ p: 4, width: '90%', maxWidth: 500 }}>
            <Typography variant="h6" component="h2" gutterBottom>
                {/* Mostrar el título recibido, que es dinámico */}
                {title}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    required
                    sx={{ mb: 3 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button onClick={onCancel} variant="outlined">Cancelar</Button>
                    <Button type="submit" variant="contained" sx={{ backgroundColor: "button.main" }}>
                        Guardar Cambios
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default ForumForm;