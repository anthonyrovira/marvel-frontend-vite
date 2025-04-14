import axios from "axios";
import { TCharacter, TComic, ToggleFavoriteResponse } from "../types";

// const cookies = new UniversalCookies();
const API_URL = import.meta.env.VITE_HYSTERIA_BACKEND_URL;

// Configuration Axios avec interceptor pour le JWT
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const favoritesService = {
  async toggleCharacterFavorite(character: TCharacter, token: string): Promise<{ characters: TCharacter[] }> {
    try {
      const response = await api.post<{ characters: TCharacter[] }>(
        "/favorites/characters",
        { character },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        throw new Error(error.response?.data?.message || "Failed to toggle character favorite");
      }
      console.error(error);
      throw new Error("An unexpected error occurred");
    }
  },

  async toggleComicFavorite(comic: TComic, token: string): Promise<{ comics: TComic[] }> {
    try {
      const response = await api.post<{ comics: TComic[] }>(
        "/favorites/comics",
        { comic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to toggle comic favorite");
      }
      throw new Error("An unexpected error occurred");
    }
  },

  async getFavorites(token: string): Promise<{ characters: TCharacter[]; comics: TComic[] }> {
    try {
      const response = await api.get<ToggleFavoriteResponse>("/favorites", { headers: { Authorization: `Bearer ${token}` } });
      return response.data.favorites;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to fetch favorites");
      }
      throw new Error("An unexpected error occurred");
    }
  },

  async clearFavorites(token: string): Promise<{ message: string }> {
    try {
      const response = await api.delete<ToggleFavoriteResponse>("/favorites", { headers: { Authorization: `Bearer ${token}` } });
      return { message: response.data.message };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to clear favorites");
      }
      throw new Error("An unexpected error occurred");
    }
  },
};
