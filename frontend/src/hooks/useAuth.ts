import { useState, useEffect, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'eventflow-auth-token';

// Definimos a estrutura dos dados que esperamos encontrar dentro do token
interface DecodedToken {
  sub: string;
  email: string;
  role: 'user' | 'organizer';
  iat: number;
  exp: number;
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => {
    // Ao iniciar, tentamos ler o token diretamente do localStorage
    return localStorage.getItem(TOKEN_KEY);
  });

  // useEffect para atualizar o estado se o localStorage mudar (útil para tabs múltiplas)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem(TOKEN_KEY));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  // useMemo descodifica o token apenas quando ele muda, otimizando a performance
  const user = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Falha ao descodificar o token:', error);
      // Se o token for inválido, fazemos logout para limpar
      handleLogout();
      return null;
    }
  }, [token]);

  return {
    token,
    user, // O objeto do utilizador com id, email e role
    login: handleLoginSuccess,
    logout: handleLogout,
  };
}
