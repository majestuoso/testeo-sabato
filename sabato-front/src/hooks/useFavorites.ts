import { useState, useEffect, useCallback } from 'react';

export interface Libro {
  libro_id: number;
  titulo: string;
  autor: string;
  genero: string;
  descripcion: string;
  portada_url: string;
  nivel_educativo?: string;
  calificacion_promedio?: number;
}

export const useFavorites = (usuarioId?: number | string | null) => {
  // Tomamos el usuario del localStorage si no viene por parámetro
  const idUsuario = usuarioId || localStorage.getItem('usuario_id') || '22';

  const [favorites, setFavorites] = useState<Libro[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    if (!idUsuario) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/api/v1/favoritos/usuario/${idUsuario}`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudieron obtener los favoritos`);
      }

      const data = await response.json();

      // Mapeo normalizado: si la API envía { usuario_id, libro_id, libro: {...} }, extraemos libro.
      // Si ya envía el objeto plano, lo dejamos como está.
      const librosFormateados: Libro[] = (Array.isArray(data) ? data : [])
        .map((item: any) => item.libro || item)
        .filter((libro: any) => libro && (libro.libro_id || libro.id));

      setFavorites(librosFormateados);
    } catch (err: any) {
      console.error('Error en fetchFavorites:', err);
      setError(err.message || 'Error al conectar con el servidor');
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [idUsuario]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = async (libroId: number | string) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/favoritos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: idUsuario, libro_id: Number(libroId) }),
      });

      if (!response.ok) throw new Error('Error al agregar favorito');
      await fetchFavorites();
    } catch (err: any) {
      console.error('Error en addFavorite:', err);
      setError(err.message);
    }
  };

  const removeFavorite = async (libroId: number | string) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/favoritos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: idUsuario, libro_id: Number(libroId) }),
      });

      if (!response.ok) throw new Error('Error al eliminar favorito');
      
      setFavorites((prev) => prev.filter((item) => String(item.libro_id) !== String(libroId)));
    } catch (err: any) {
      console.error('Error en removeFavorite:', err);
      setError(err.message);
    }
  };

  const isBookFavorite = (libroId: number | string) => {
    return favorites.some((item) => String(item.libro_id) === String(libroId));
  };

  const toggleFavorite = async (libroId: number | string, currentlyFavorite?: boolean) => {
    const isFav = currentlyFavorite !== undefined ? currentlyFavorite : isBookFavorite(libroId);
    if (isFav) {
      await removeFavorite(libroId);
    } else {
      await addFavorite(libroId);
    }
  };

  return {
    favorites,
    favoriteBooks: favorites, // Alias para garantizar compatibilidad con Favs.tsx
    loading,
    error,
    addFavorite,
    removeFavorite,
    isBookFavorite,
    toggleFavorite,
    refetch: fetchFavorites,
  };
};