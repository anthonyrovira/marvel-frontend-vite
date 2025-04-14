import { AxiosError } from "axios";
import { useCallback, useMemo } from "react";
import { TComic, User } from "../types";
import { favoritesService } from "../services/favoritesServices";

interface UseCardComicsProps {
  comic: TComic;
  user: User | null;
  token: string | null;
  updateUserData: (newUserData: User) => void;
}

const useCardComics = ({ comic, user, token, updateUserData }: UseCardComicsProps) => {
  const favorites = useMemo(() => {
    if (!user?.favorites?.comics || !Array.isArray(user.favorites.comics)) {
      return [];
    }
    return [...user.favorites.comics];
  }, [user]);

  const isFavorite = useMemo(() => {
    if (!favorites) {
      return false;
    }
    return favorites.some((favorite) => favorite._id === comic._id);
  }, [favorites, comic]);

  const handleComicFavorite = useCallback(async () => {
    try {
      const selectedComic: TComic = {
        _id: comic._id,
        name: comic.name,
        title: comic.title,
        description: comic.description,
        thumbnail: comic.thumbnail,
      };

      const response = await favoritesService.toggleComicFavorite(selectedComic, token || "");

      if (response) {
        updateUserData({
          ...user!,
          favorites: {
            ...user!.favorites,
            comics: response.comics,
          },
        });
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
  }, [token, comic]);

  return {
    isFavorite,
    handleComicFavorite,
  };
};

export default useCardComics;
