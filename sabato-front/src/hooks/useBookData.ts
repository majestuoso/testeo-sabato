import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../environments/api';

export const useBookData = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // FIX: Cambiado /libros por /books para coincidir con Express
        const response = await fetch(`${API_BASE_URL}/api/v1/books`);
        
        const text = await response.text();
        let data: any = [];
        try {
          data = text ? JSON.parse(text) : [];
        } catch {
          throw new Error(`El servidor devolvió un formato no válido (${response.status})`);
        }

        if (!response.ok) {
          throw new Error(data.message || data.error || 'Error al obtener los libros');
        }

        setBooks(Array.isArray(data) ? data : data.books || []);
      } catch (err: any) {
        console.error('Error cargando libros:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
};