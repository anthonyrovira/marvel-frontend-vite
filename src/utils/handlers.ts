import { AxiosError } from "axios";
import { favoritesService } from "../services/favoritesServices";
import { TCharacter, User } from "../types";

export const toggleCharacterFavorite = async (
  character: TCharacter,
  token: string | null,
  user: User | null,
  updateUserData: (newUserData: User) => void
) => {
  try {
    const selectedCharacter: TCharacter = {
      _id: character._id,
      name: character.name,
      description: character.description,
      thumbnail: character.thumbnail,
      comics: character.comics,
    };

    const response = await favoritesService.toggleCharacterFavorite(selectedCharacter, token || "");

    if (response) {
      updateUserData({
        ...user!,
        favorites: {
          ...user!.favorites,
          characters: response.characters,
        },
      });
    } else {
      console.error("no response coming from backend");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      if (error.response?.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(error.response?.data.message);
      }
    }
  }
};
