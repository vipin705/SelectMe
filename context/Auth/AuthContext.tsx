import { createContext, useState } from 'react';
import { loginWithEmail } from '../../services/authentication/userAuth';

type AuthContextType = {
  token: string | null;
  logout: () => void;
  getUserID: (id: string) => void;
  userId: string | null;
  setUserToken: (token: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  logout: () => {},
  getUserID: () => {},
  userId: null,
  setUserToken: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const getUserID = (id: string) => {
    setUserId(id);
  };

  const setUserToken = (token: string) => {
    setToken(token);
  };

  const logout = () => {
    console.log('Logout');
  };

  return (
    <AuthContext.Provider
      value={{ token, logout, getUserID, userId, setUserToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
