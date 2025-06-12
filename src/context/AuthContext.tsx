import { createContext, useContext, useState, ReactNode } from "react";
import { login } from "@/services/AuthService";


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
  const [authError, setAuthError] = useState<string | null>(null);


  const handleLogin = async (credentials: { email: string; password: string }) => {
    setAuthError(null);
    const response = await login(credentials);
    if (response.access_token) {
      console.log("roleId reçu :", response.user?.roleId); // Debug
      if (!response.user || parseInt(response.user.roleId as any, 10) !== 1) {
        setAuthError("Seuls les administrateurs peuvent se connecter");
        setUser(null);
        localStorage.removeItem("userToken");
        throw new Error("Seuls les administrateurs peuvent se connecter");
      }
      localStorage.setItem("userToken", response.access_token);
      setUser(response.user);
    } else {
      setAuthError("Échec de la connexion");
      throw new Error("Échec de la connexion");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
  };

  const isAuthenticated = !!localStorage.getItem("userToken");

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout, isAuthenticated }}>
      {authError && <div style={{ color: "red" }}>{authError}</div>}
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