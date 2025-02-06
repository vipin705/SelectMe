import { createContext, useState } from 'react';
import { loginWithEmail } from '../../services/authentication/userAuth';

type AuthContextType = {
  token: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const data = await loginWithEmail(email, password);
    if (data) {
      setToken(data);
    } else {
      console.error('Failed to retrieve token');
    }
  };

  const logout = () => {
    console.log('Logout');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
