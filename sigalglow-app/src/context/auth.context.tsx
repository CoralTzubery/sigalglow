import { createContext, useEffect, useState } from "react";
import { getToken, clearToken } from "../models/apiClient";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isLoggedIn: boolean;
  logout(): void;
  setLoggedIn: (loggedIn: boolean) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(!!getToken());
  }, []);

  function logout() {
    clearToken();
    setLoggedIn(false);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}