import axios from "axios";
import { useEffect, useState } from "react";
import { TCharacters, TComic } from "../types";
import { useAuth } from "../contexts/AuthContext";

const useFavorites = () => {
  const { token } = useAuth();
  const [favCharacters, setFavCharacters] = useState<TCharacters[]>([]);
  const [favComics, setFavComics] = useState<TComic[]>([]);
  const [favoriteChange, setFavoriteChange] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(`${import.meta.env.VITE_HYSTERIA_BACKEND_URL}/user/${token}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        console.log(response);
        const newUserData = response.data.user;
        setFavCharacters(newUserData.favorites.characters);
        setFavComics(newUserData.favorites.comics);
      } else {
        console.error("no response coming from backend");
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, [token, favoriteChange]);

  return {
    favoriteChange,
    favCharacters,
    favComics,
    isLoading,
    setFavoriteChange,
  };
};

export default useFavorites;
