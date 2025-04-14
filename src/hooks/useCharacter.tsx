import { AxiosError } from "axios";
import { TCharacter, User } from "../types";
import { useCallback, useEffect, useState } from "react";
import { toggleCharacterFavorite } from "../utils/handlers";
import { charactersService } from "../services/charactersServices";
interface UseCharacter {
  characterId: string | undefined;
  user: User | null;
  token: string | null;
  updateUserData: (newUserData: User) => void;
}

const useCharacter = ({ characterId, user, token, updateUserData }: UseCharacter) => {
  const [dataCharacter, setDataCharacter] = useState<TCharacter | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCharacterFavorite, setIsCharacterFavorite] = useState<boolean>(false);

  const handleFavoriteCharacter = useCallback(async () => {
    if (dataCharacter) {
      toggleCharacterFavorite(dataCharacter, token, user, updateUserData);
    }
  }, [dataCharacter, user, token]);

  useEffect(() => {
    const checkCharacterFavorite = (favorites: TCharacter[] | undefined) => {
      const isFavorite = favorites?.some((favorite) => favorite._id === characterId) || false;
      setIsCharacterFavorite(isFavorite);
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await charactersService.getCharacterDetails(characterId || "");

        if (response) {
          setDataCharacter(response);
        } else {
          console.error("no response coming from backend");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 500) {
            console.error("An error occurred");
            throw new Error("An error occurred");
          } else {
            console.error(error.response?.data?.message);
            throw new Error(error.response?.data?.message || "An unexpected error occurred");
          }
        }
        throw new Error("An unexpected error occurred");
      }
    };
    fetchData();
    checkCharacterFavorite(user?.favorites.characters);
    setIsLoading(false);
  }, [token, user, characterId]);

  return {
    dataCharacter,
    isLoading,
    isCharacterFavorite,
    handleFavoriteCharacter,
  };
};

export default useCharacter;
