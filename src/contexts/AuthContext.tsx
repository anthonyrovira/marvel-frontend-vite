import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { User } from "../types";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUserData: (newUserData: User) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user_token", "userData"]);
  const [state, setState] = useState<Omit<AuthContextType, "login" | "logout" | "updateUserData">>({
    user: cookies.userData || null,
    token: cookies.user_token || null,
    isAuthenticated: Boolean(cookies.user_token),
  });

  const login = (newToken: string, userData: User) => {
    const decodedToken = jwtDecode<{ exp: number }>(newToken);
    const expirationDate = new Date(decodedToken.exp * 1000);

    // Gestion des cookies
    setCookie("user_token", newToken, {
      path: "/",
      expires: expirationDate,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    setCookie("userData", userData, {
      path: "/",
      expires: expirationDate,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Mise à jour du state
    setState({
      user: userData,
      token: newToken,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    // Nettoyage des cookies
    removeCookie("user_token", { path: "/" });
    removeCookie("userData", { path: "/" });

    // Réinitialisation du state
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  const updateUserData = (newUserData: User) => {
    // Mettre à jour les cookies
    setCookie("userData", newUserData, {
      path: "/",
      expires: new Date(jwtDecode<{ exp: number }>(state.token!).exp * 1000),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Mettre à jour le state
    setState((prev) => ({
      ...prev,
      user: newUserData,
    }));
  };

  useEffect(() => {
    const verifyTokenValidity = () => {
      if (cookies.user_token) {
        try {
          const decoded = jwtDecode<{ exp: number }>(cookies.user_token);
          if (decoded.exp * 1000 < Date.now()) logout();
        } catch (error) {
          console.error("Invalid token format");
          logout();
        }
      }
    };
    verifyTokenValidity();
  }, []);

  return <AuthContext.Provider value={{ ...state, login, logout, updateUserData }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
