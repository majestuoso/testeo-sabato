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

      // Evita peticiones a /api/v1/users/undefined
      if (
        storedToken && 
        storedUserId && 
        storedUserId !== 'undefined' && 
        storedUserId !== 'null'
      ) {
        setToken(storedToken);
        try {
          // FIX: Ruta corregida de /user/ a /users/
          const response = await fetch(`${API_BASE_URL}/api/v1/users/${storedUserId}`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setUser({
              ...userData,
              userId: storedUserId,
              rol: localStorage.getItem('rol') || undefined,
            });
          } else if (response.status === 401 || response.status === 403) {
            logout();
          } else {
            console.warn('Error temporal al validar sesión, se mantiene el token local.');
            setUser({
              userId: storedUserId,
              rol: localStorage.getItem('rol') || undefined,
              nombre: localStorage.getItem('username') || undefined,
            });
          }
        } catch (error) {
          console.error('Error al cargar datos del usuario:', error);
          setUser({
            userId: storedUserId,
            rol: localStorage.getItem('rol') || undefined,
            nombre: localStorage.getItem('username') || undefined,
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

      // FIX: Parsing seguro para evitar la falla "Unexpected token '<'" en errores 404/500
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

      // Extraer objeto de usuario
      const userObj = data.usuario || data.user || data;

      console.log('Objeto usuario recibido en el frontend:', userObj);

      // Buscar el identificador soportando todas las variantes posibles de DB/backend
      const extractedUserId = 
        userObj.id || 
        userObj.userId || 
        userObj.id_usuario || 
        userObj._id || 
        userObj.usuario_id ||
        data.userId ||
        data.id;

      const extractedToken = data.token || userObj.token || 'session-active';
      const extractedRol = userObj.rol || userObj.role || data.rol;

      if (!extractedUserId) {
        console.error('Estructura completa de la respuesta:', data);
        throw new Error('El servidor no devolvió un ID de usuario explícito.');
      }

      // Guardar en localStorage
      localStorage.setItem('token', extractedToken);
      localStorage.setItem('userId', String(extractedUserId));
      if (extractedRol) localStorage.setItem('rol', String(extractedRol));
      if (userObj.nombre) localStorage.setItem('username', userObj.nombre);

      setToken(extractedToken);

      setUser({
        ...userObj,
        userId: String(extractedUserId),
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
      // FIX: Ruta corregida de /user/ a /users/
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
        setUser((prevUser) => ({
          ...prevUser,
          ...userData
        }));
        
        if (userData.nombre) {
          localStorage.setItem('username', userData.nombre);
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