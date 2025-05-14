import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setAuth(user);
  }, []);

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setAuth(user);
  };

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setAuth(null);
    window.location.href = '/login'; // Optional: Redirect on logout
  }, []);

  // 🔒 Auto logout on inactivity
  useEffect(() => {
    if (!auth) return;

    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, IDLE_TIMEOUT);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeout);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [auth, logout]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
