import { createContext, useContext, useEffect, useState } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try anonymous sign-in; if it fails, the app still works (localStorage fallback)
    signInAnonymously(auth).catch(err => {
      console.warn('Anonymous auth failed — running in offline mode:', err.code);
    });

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
