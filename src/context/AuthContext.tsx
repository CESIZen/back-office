import { createContext, useContext, useState, ReactNode } from "react";
import { login } from "@/services/AuthService";
import { useEffect } from "react";


export interface User {
  name: string;
  email: string;
  password: string;
  roleId: number;
}
interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    const response = await login(credentials);
    console.log("response handleLogin", response);
    if (response.access_token) {
      if (response.user && response.user.roleId !== 1) {
        throw new Error("Seuls les administrateurs peuvent se connecter");
      }
      localStorage.setItem("userToken", response.access_token);
      console.log('Local Storage Auth Provider',localStorage)
      setUser(response.user);
    } else {
      throw new Error("Échec de la connexion");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
  };

  const isAuthenticated = !!localStorage.getItem("userToken");

  // useEffect(() => {
  //   const token = localStorage.getItem("userToken");
  //   if (!token && user) {
  //     handleLogout();
  //   }
  // }, [user]);

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};