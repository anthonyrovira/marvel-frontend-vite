import axios from "axios";
import { AuthResponse, SignInRequest, SignUpRequest } from "../types";

const API_URL = import.meta.env.VITE_HYSTERIA_BACKEND_URL as string;

export const authService = {
  async signUp(data: SignUpRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Signup failed");
      }
      throw new Error("An unexpected error occurred");
    }
  },

  async signIn(data: SignInRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/signin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Signin failed");
      }
      throw new Error("An unexpected error occurred");
    }
  },
};
