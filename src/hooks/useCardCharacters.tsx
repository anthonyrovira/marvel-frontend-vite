import { AxiosError } from "axios";
import { useCallback, useMemo } from "react";
import { TCharacter, User } from "../types";
import { favoritesService } from "../services/favoritesServices";

interface UseCardCharactersProps {
  character: TCharacter;
  user: User | null;
  token: string | null;
  updateUserData: (newUserData: User) => void;
}

const useCardCharacters = ({ character, user, token, updateUserData }: UseCardCharactersProps) => {
  const favorites = useMemo(() => {
    if (!user?.favorites?.characters || !Array.isArray(user.favorites.characters)) {
      return [];
    }
    return [...user.favorites.characters];
  }, [user]);

  const isFavorite = useMemo(() => {
    if (!favorites) {
      return false;
    }
    return favorites.some((favorite) => favorite._id === character._id);
  }, [favorites, character]);

  const handleFavorite = useCallback(async () => {
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
  }, [token, character]);

  return {
    isFavorite,
    handleFavorite,
  };
};

export default useCardCharacters;
