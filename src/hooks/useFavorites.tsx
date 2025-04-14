import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { favoritesService } from "../services/favoritesServices";

const useFavorites = () => {
  const { user, token, updateUserData } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      setIsLoading(true);
      const response = await favoritesService.getFavorites(token || "");

      if (response) {
        updateUserData({
          ...user!,
          favorites: {
            characters: response.characters,
            comics: response.comics,
          },
        });
      } else {
        console.error("no response coming from backend");
      }
      setIsLoading(false);
    };
    fetchUserFavorites();
  }, []);

  return {
    isLoading,
  };
};

export default useFavorites;
