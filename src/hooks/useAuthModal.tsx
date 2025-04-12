import { ChangeEvent, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/authServices";
import { AuthResponse, SignInRequest, SignUpRequest } from "../types";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface IUseAuthModal {
  handleModalVisibility: () => void;
}

export const useAuthModal = ({ handleModalVisibility }: IUseAuthModal) => {
  const { login } = useAuth();

  const [authFormData, setAuthFormData] = useState<SignInRequest | SignUpRequest>({
    username: "",
    email: "",
    password: "",
  });

  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [err, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAuthSubmit = async (credentials: { email?: string; username?: string; password: string }) => {
    try {
      setError(null);
      const authFunction = <T,>(data: T): Promise<AuthResponse> => {
        return authMode === "signup" ? authService.signUp(data as SignUpRequest) : authService.signIn(data as SignInRequest);
      };

      const { token, user } = await authFunction(credentials);
      login(token, user);

      handleModalVisibility();
      navigate("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (authMode === "signin") {
          if (err.response?.status === 401) {
            setError("Wrong email or password");
          } else if (err.response?.status === 404) {
            setError("This email doesn't have an account");
          } else {
            setError("A problem occurred, try again later");
          }
        } else if (err.response?.status === 409) {
          setError("User already exists");
        } else {
          setError("A problem occurred, try again later");
        }
      }
    }
  };

  return {
    authMode,
    authFormData,
    error: err,
    setAuthMode,
    handleInputChange,
    handleAuthSubmit,
  };
};
