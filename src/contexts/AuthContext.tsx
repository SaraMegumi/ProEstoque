import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

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
  registrar: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

const TOKEN_KEY = "@proestoque:token";
const USER_KEY = "@proestoque:user";

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
        console.error("Erro ao carregar sessão:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadSession();
  }, []);

  async function login(email: string, senha: string) {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { email, senha });
      const { usuario, token: novoToken } = response.data;

      await AsyncStorage.setItem(TOKEN_KEY, novoToken);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(usuario));

      setToken(novoToken);
      setUser(usuario);
    } finally {
      setIsLoading(false);
    }
  }

  async function registrar(nome: string, email: string, senha: string) {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/registro", { nome, email, senha });
      const { usuario, token: novoToken } = response.data;

      await AsyncStorage.setItem(TOKEN_KEY, novoToken);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(usuario));

      setToken(novoToken);
      setUser(usuario);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
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
        registrar,
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
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
