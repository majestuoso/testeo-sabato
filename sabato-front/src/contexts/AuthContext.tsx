import React, { useState, useEffect, ReactNode } from 'react';
import { API_BASE_URL } from '../environments/api';
import { AuthContext } from './AuthContextDefinition';
import type { AuthContextType, User } from './AuthContextDefinition';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  // Cargar sesión almacenada al iniciar
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('userId');
      const storedName = localStorage.getItem('username');

      if (
        storedToken && 
        storedUserId && 
        storedUserId !== 'undefined' && 
        storedUserId !== 'null'
      ) {
        setToken(storedToken);
        try {
          const response = await fetch(`${API_BASE_URL}/api/v1/users/${storedUserId}`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const userData = await response.json();
            
            // Consigue el nombre desde la API o recupera el guardado en localStorage
            const nombreFinal = 
              userData.nombre || 
              userData.username || 
              userData.nombre_usuario || 
              storedName || 
              'Florencia';

            setUser({
              ...userData,
              userId: storedUserId,
              usuario_id: Number(storedUserId),
              nombre: nombreFinal,
              username: nombreFinal, // Sincroniza ambas claves para la UI
              rol: userData.rol?.nombre_rol || userData.rol || localStorage.getItem('rol') || undefined,
            });

            localStorage.setItem('username', nombreFinal);
          } else if (response.status === 401 || response.status === 403) {
            logout();
          } else {
            console.warn('Error temporal al validar sesión, se mantendrán los datos locales.');
            const fallbackName = storedName || 'Florencia';
            setUser({
              userId: storedUserId,
              usuario_id: Number(storedUserId),
              rol: localStorage.getItem('rol') || undefined,
              nombre: fallbackName,
              username: fallbackName,
            });
          }
        } catch (error) {
          console.error('Error al cargar datos del usuario:', error);
          const fallbackName = storedName || 'Florencia';
          setUser({
            userId: storedUserId,
            usuario_id: Number(storedUserId),
            rol: localStorage.getItem('rol') || undefined,
            nombre: fallbackName,
            username: fallbackName,
          });
        }
      } else {
        logout();
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contrasena: password }),
      });

      const responseText = await response.text();
      let data: any = {};
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error(`Respuesta no válida del servidor (${response.status})`);
      }

      if (!response.ok) {
        throw new Error(data.error || data.mensaje || 'Error al iniciar sesión');
      }

      const userObj = data.usuario || data.user || data;

      const extractedUserId = 
        userObj.usuario_id ||
        userObj.id || 
        userObj.userId || 
        userObj.id_usuario || 
        data.userId ||
        data.id;

      const extractedToken = data.token || userObj.token || 'session-active';
      const extractedRol = userObj.rol?.nombre_rol || userObj.rol || userObj.role || data.rol;
      const extractedName = userObj.nombre || userObj.username || userObj.nombre_usuario || 'Florencia';

      if (!extractedUserId) {
        throw new Error('El servidor no devolvió un ID de usuario explícito.');
      }

      // Guardar en localStorage
      localStorage.setItem('token', extractedToken);
      localStorage.setItem('userId', String(extractedUserId));
      localStorage.setItem('username', extractedName);
      if (extractedRol) localStorage.setItem('rol', String(extractedRol));

      setToken(extractedToken);

      setUser({
        ...userObj,
        userId: String(extractedUserId),
        usuario_id: Number(extractedUserId),
        nombre: extractedName,
        username: extractedName,
        rol: extractedRol,
      });

      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message?.includes('Failed to fetch')
        ? 'No se pudo conectar con el servidor. ¿Está en ejecución?'
        : error.message || 'Error desconocido';
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('rol');
    localStorage.removeItem('username');
    setUser(null);
    setToken(null);
  };

  const updateUser = async (updatedData: Record<string, any>) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`${API_BASE_URL}/api/v1/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      const responseText = await response.text();
      let userData: any = {};
      try {
        userData = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error('Error al interpretar la respuesta del servidor');
      }

      if (response.ok) {
        const nuevoNombre = userData.nombre || userData.username || userData.nombre_usuario;

        setUser((prevUser) => ({
          ...prevUser,
          ...userData,
          nombre: nuevoNombre || prevUser?.nombre,
          username: nuevoNombre || prevUser?.username,
        }));
        
        if (nuevoNombre) {
          localStorage.setItem('username', nuevoNombre);
        }
        return { success: true };
      } else {
        throw new Error(userData.error || 'Error al actualizar el usuario');
      }
    } catch (error: any) {
      console.error('Error al actualizar usuario:', error);
      return { success: false, error: error.message };
    }
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};