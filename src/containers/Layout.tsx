import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FC, useEffect } from "react";
import { favoritesService } from "../services/favoritesServices";
import { useAuth } from "../contexts/AuthContext";
import commonStyles from "../styles/Common.module.css";

interface ILayout {
  search: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Layout: FC<ILayout> = ({ handleSearch, search }) => {
  const { user, token, updateUserData } = useAuth();

  useEffect(() => {
    const fetchUserFavorites = async () => {
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
    };
    fetchUserFavorites();
  }, [token]);

  return (
    <main className={commonStyles.layout}>
      <Header search={search} handleSearch={handleSearch} />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
