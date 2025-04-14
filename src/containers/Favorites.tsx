import { FC } from "react";
import CardComics from "../components/CardComics";
import CardCharacters from "../components/CardCharacters";
import { TCharacter, TComic } from "../types";
import sectionStyles from "../styles/Sections.module.css";
import characterStyles from "./Character.module.css";
import commonStyles from "../styles/Common.module.css";
import { useAuth } from "../contexts/AuthContext";

interface IFavorites {
  username?: string;
}

const Favorites: FC<IFavorites> = ({ username }) => {
  const { user } = useAuth();

  return (
    <section className={`${commonStyles.wrapper} ${commonStyles.sectionContainer} ${sectionStyles.favoritesContainer}`}>
      <div className={sectionStyles.sectionTitle}>
        <div className={sectionStyles.sectionLine} />
        <h2 className={sectionStyles.sectionText}>
          {username ? username.charAt(0)?.toUpperCase() + username.slice(1) : "Your favorites"}
        </h2>
        <div className={sectionStyles.sectionLine} />
      </div>
      <div className={`${characterStyles.portraitSection}`}>
        <h4>
          Favorites characters <span>(Results : {user?.favorites.characters.length})</span>
        </h4>
        <div className={sectionStyles.sectionCards}>
          {user?.favorites.characters.map((character: TCharacter) => (
            <CardCharacters key={character._id} character={character} className={commonStyles.cardContainer} />
          ))}
        </div>
      </div>
      <div className={`${characterStyles.portraitSection}`}>
        <h4>
          Favorites comics <span>(Results : {user?.favorites.comics.length})</span>
        </h4>
        <div className={sectionStyles.sectionCards}>
          {user?.favorites &&
            user.favorites.comics.length > 0 &&
            user.favorites.comics.map((comic: TComic) => (
              <CardComics key={comic._id} comic={comic} className={commonStyles.cardContainer} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
