import { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));

  const value = useMemo(() => {
    const login = async (username, password) => {
      const data = await api.login(username, password);
      localStorage.setItem('admin_token', data.token);
      setToken(data.token);
    };

    const logout = () => {
      localStorage.removeItem('admin_token');
      setToken(null);
    };

    return { token, isAuthenticated: Boolean(token), login, logout };
  }, [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
