import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface User {
  id: string;
  nome: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}


const TOKEN_KEY = '@proestoque:token';
const USER_KEY = '@proestoque:user';


const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); 


  useEffect(() => {
    async function loadSession() {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        const storedUser = await AsyncStorage.getItem(USER_KEY);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao carregar sessão:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadSession();
  }, []);

  async function login(email: string, senha: string) {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const fakeUser: User = {
        id: '1',
        nome: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
      };
      const fakeToken = `token-${Date.now()}`;

      await AsyncStorage.setItem(TOKEN_KEY, fakeToken);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(fakeUser));

      setToken(fakeToken);
      setUser(fakeUser);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setToken(null);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}