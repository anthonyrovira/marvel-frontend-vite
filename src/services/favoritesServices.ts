import axios from "axios";
import { Character, Comic, ToggleFavoriteResponse } from "../types";
import { useAuth } from "../contexts/AuthContext";

// const cookies = new UniversalCookies();
const API_URL = import.meta.env.VITE_HYSTERIA_BACKEND_URL;

// Configuration Axios avec interceptor pour le JWT
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const { token } = useAuth();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const favoritesService = {
  async toggleCharacterFavorite(character: Character): Promise<Character[]> {
    try {
      const response = await api.post<ToggleFavoriteResponse>("/favorites/characters", { character });
      return response.data.favorites.characters;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to toggle character favorite");
      }
      throw new Error("An unexpected error occurred");
    }
  },

  async toggleComicFavorite(comic: Comic): Promise<Comic[]> {
    try {
      const response = await api.post<ToggleFavoriteResponse>("/favorites/comics", { comic });
      return response.data.favorites.comics;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to toggle comic favorite");
      }
      throw new Error("An unexpected error occurred");
    }
  },

  async getFavorites(): Promise<{ characters: Character[]; comics: Comic[] }> {
    try {
      const response = await api.get<ToggleFavoriteResponse>("/favorites");
      return response.data.favorites;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to fetch favorites");
      }
      throw new Error("An unexpected error occurred");
    }
  },

  async clearFavorites(): Promise<{ message: string }> {
    try {
      const response = await api.delete<ToggleFavoriteResponse>("/favorites");
      return { message: response.data.message };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to clear favorites");
      }
      throw new Error("An unexpected error occurred");
    }
  },
};
