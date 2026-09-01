// src/hooks/useFavorites.ts
import { useState, useEffect, useCallback } from 'react';

export interface FavoriteItem {
  id: string | number;
  [key: string]: any;
}

export interface UseFavoritesReturn {
  favorites: FavoriteItem[];
  isBookFavorite: (bookId: string | number) => boolean;
  loading: boolean;
  fetchFavorites: () => Promise<void>;
}

export const useFavorites = (usuarioId?: string | number): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFavorites = useCallback(async () => {
    if (!usuarioId) return; // Evita la llamada si el usuario no inició sesión

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/v1/favoritos?usuario_id=${usuarioId}`);
      if (!res.ok) throw new Error('Respuesta no válida del servidor');
      const data = await res.json();
      setFavorites(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [usuarioId]);

  const isBookFavorite = useCallback(
    (bookId: string | number): boolean => {
      return favorites.some((fav) => String(fav.id) === String(bookId));
    },
    [favorites]
  );

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { favorites, isBookFavorite, loading, fetchFavorites };
};

export default useFavorites;