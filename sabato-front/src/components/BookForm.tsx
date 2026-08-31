import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  TextareaAutosize,
  styled,
  useTheme,
  Paper,
  Grid,
  CircularProgress 
} from '@mui/material';

// NOTA: Se eliminan useParams y useNavigate ya que el formulario es llamado por un modal y no por una ruta.

// --- Constantes de Opciones ---
const GENEROS = ['Novela', 'Ficción', 'Ciencia Ficción', 'Poesía', 'Ensayo', 'Biografía'];
const NIVELES_EDUCATIVOS = ['Básico', 'Superior'];

// --- Datos Iniciales del Libro ---
const INITIAL_BOOK_DATA = {
  libro_id: undefined, // Usamos este campo para la API
  titulo: '',
  autor: '',
  genero: '',
  nivel_educativo: '',
  descripcion: '',
  imagenUrl: '', // Se mapea a 'portada_url' para el backend
};

// --- Componentes Estilizados (Material UI) ---
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
  maxWidth: '900px',
  // Quitamos el margin: '40px auto' ya que el modal lo centrará
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.button?.main || '#f25600',
  color: '#FFFFFF',
  padding: '10px 25px',
  borderRadius: '8px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#cc4800',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.text.secondary,
  border: '1px solid #ccc',
  padding: '10px 25px',
  borderRadius: '8px',
  fontWeight: 'bold',
  marginRight: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.grey[200], 
    borderColor: theme.palette.grey[500], 
  },
}));

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  minHeight: '100px',
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: '4px',
  fontFamily: theme.typography.fontFamily,
  fontSize: '1rem',
  resize: 'vertical',
  '&:focus': {
    borderColor: theme.palette.primary.main,
    outline: 'none',
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
  },
}));

// --- 3. Componente Funcional ---

// 💡 Ahora acepta props para el modo edición, guardado y cancelación
const BookForm = ({ bookToEdit, onSave, onCancel, title }) => {
  
  const theme = useTheme();
  
  // 💡 ESTADO INICIAL: Mapea bookToEdit (si existe) o usa datos iniciales vacíos
  const [formData, setFormData] = useState(INITIAL_BOOK_DATA);
  const [loading, setLoading] = useState(false); // Para manejar la carga local de la acción de guardar
  
  // 💡 EFECTO: Actualiza el formulario cuando cambia bookToEdit (al abrir el modal)
  useEffect(() => {
    if (bookToEdit) {
      // Mapeamos los campos del objeto bookToEdit al formato del formulario
      const mappedData = {
          ...bookToEdit,
          libro_id: bookToEdit.libro_id,
          // Mapeamos el campo de la DB (portada_url) al campo del formulario (imagenUrl)
          imagenUrl: bookToEdit.imagenUrl || bookToEdit.portada_url || '' 
      };
      setFormData(mappedData);
    } else {
      setFormData(INITIAL_BOOK_DATA);
    }
  }, [bookToEdit]); 

  // Manejador de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 💡 Manejador de Guardado (POST/PUT delegado al padre)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ---  Mapeamos 'imagenUrl' a 'portada_url' y limpiamos IDs ---
    const payload = { ...formData };
    
    // 1. Eliminar IDs internos del componente
    delete payload.id; 

    // 2. Mapear 'imagenUrl' (frontend) a 'portada_url' (backend/DB)
    if (payload.imagenUrl !== undefined) {
        payload.portada_url = payload.imagenUrl;
    }
    delete payload.imagenUrl; 
    
    // Incluimos libro_id en el payload si estamos editando (crucial para que Dashboard use PUT)
    if (bookToEdit && bookToEdit.libro_id) {
        payload.libro_id = bookToEdit.libro_id;
    }
    
    try {
        // 💡 Llamamos al handler del componente padre (Dashboard) para que haga el API call
        await onSave(payload);
        
    } catch (err) {
        // El componente padre ya maneja el Snackbar para errores
        console.error("Error al guardar en el formulario:", err);
    } finally {
        setLoading(false);
    }
  };

  // 💡 La cancelación llama al prop onCancel
  const handleCancel = () => {
    onCancel(); 
  };
  
  // Renderizado
  const currentTitle = title || (bookToEdit ? "Editar Libro" : "Crear Nuevo Libro");
  const bookIdentifier = bookToEdit?.libro_id ? ` (ID: ${bookToEdit.libro_id})` : '';

  return (
    // 💡 Usa el nuevo handler unificado
    <FormContainer component="form" onSubmit={handleFormSubmit}>
      
      <Box mb={4}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          sx={{ color: theme.palette.body?.main || '#4A4C52' }}
        >
          {currentTitle}{bookIdentifier}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Columna Izquierda: Campos del formulario */}
        <Grid item xs={12} md={6}>
          
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Título</Typography>
            <TextField
              name="titulo"
              fullWidth
              value={formData.titulo}
              onChange={handleChange}
              variant="outlined"
              size="small"
              placeholder="Ej: El Ingenioso Hidalgo Don Quijote de la Mancha"
            />
          </Box>
          
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Autor</Typography>
            <TextField
              name="autor"
              fullWidth
              value={formData.autor}
              onChange={handleChange}
              variant="outlined"
              size="small"
              placeholder="Ej: García Márquez, Gabriel"
            />
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Género</Typography>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Selecciona Género</InputLabel>
              <Select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                label="Selecciona Género"
              >
                {GENEROS.map((g) => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Nivel Educativo</Typography>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Selecciona Nivel</InputLabel>
              <Select
                name="nivel_educativo" 
                value={formData.nivel_educativo}
                onChange={handleChange}
                label="Selecciona Nivel"
              >
                {NIVELES_EDUCATIVOS.map((n) => (
                  <MenuItem key={n} value={n}>{n}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Descripción</Typography>
            <StyledTextarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              aria-label="Descripción del libro"
            />
          </Box>

        </Grid>

        {/* Columna Derecha: Imagen */}
        <Grid item xs={12} md={6}>
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Imagen</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="URL de la imagen"
              value={formData.imagenUrl} 
              onChange={handleChange}
              name="imagenUrl"
            />
          </Box>
          
          {/* Previsualización de la Imagen */}
          <Box 
            sx={{ 
              border: '1px solid #ccc', 
              borderRadius: '8px', 
              overflow: 'hidden', 
              display: 'inline-block',
              maxWidth: '100%',
              mt: 2,
            }}
          >
            <Box 
                component="img"
                src={formData.imagenUrl || 'https://placehold.co/300x400/cccccc/333333?text=Sin+Imagen'} 
                alt="Portada del libro"
                // 🚨 Importante: Añadir fallback de error para la imagen
                onError={(e) => { e.target.src = 'https://placehold.co/300x400/cccccc/333333?text=Error+Carga'; }}
                sx={{ 
                    width: 300, 
                    height: 400, 
                    objectFit: 'cover',
                    display: 'block',
                    backgroundColor: formData.imagenUrl ? 'transparent' : '#eee', 
                }}
            />
          </Box>
        </Grid>
      </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
        <Button onClick={onCancel} variant="outlined">Cancelar</Button>
        <Button type="submit" variant="contained" sx={{ backgroundColor: "button.main" }}>
          Guardar Cambios
        </Button>
      </Box>
    </FormContainer>
  );
};

export default BookForm;
