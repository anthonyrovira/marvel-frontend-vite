import axios from "axios";
import { TCharacter } from "../types";

const API_KEY = import.meta.env.VITE_MARVEL_API_PUBLIC_KEY;
const BASE_URL = "/api-reacteur";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export const charactersService = {
  async getCharacterDetails(characterId: string): Promise<TCharacter> {
    const response = await api.get(`/comics/${characterId}`);
    return response.data;
  },

  async getCharacterComics(characterId: string): Promise<any> {
    const response = await api.get(`/comics/${characterId}/comics`);
    return response.data;
  },
};
