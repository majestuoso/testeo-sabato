import { createContext } from 'react';

export interface User {
  userId?: string;
  id?: string;
  nombre?: string;
  email?: string;
  rol?: string;
  avatar_url?: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updatedData: Record<string, any>) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);