import { FC } from "react";
import CardComics from "../components/CardComics";
import CardCharacters from "../components/CardCharacters";
import { TCharacters, TComic } from "../types";
import useFavorites from "../hooks/useFavorites";
import sectionStyles from "../styles/Sections.module.css";
import characterStyles from "./Character.module.css";
import commonStyles from "../styles/common.module.css";

interface IFavorites {
  username?: string;
}

const Favorites: FC<IFavorites> = ({ username }) => {
  const { cookies, favoriteChange, isLoading, favCharacters, favComics, setFavoriteChange } = useFavorites();

  return (
    <>
      {isLoading ? (
        <div className={commonStyles.loaderContainer}>
          <div className={commonStyles.loader} />
          <h2>Loading page...</h2>
        </div>
      ) : (
        <section className={`${commonStyles.wrapper} ${commonStyles.sectionContainer} ${sectionStyles.favoritesContainer}`}>
          <div className={sectionStyles.sectionTitle}>
            <div className={sectionStyles.sectionLine} />
            <h2 className={sectionStyles.sectionText}>
              {username ? username.charAt(0)?.toUpperCase() + username.slice(1) : "Your favorites"}
            </h2>
            <div className={sectionStyles.sectionLine} />
          </div>
          <div className={`${characterStyles.portraitSection} ${commonStyles.sectionContainer}`}>
            <h4>
              Favorites characters <span>(Results : {favCharacters.length})</span>
            </h4>
            <div className={sectionStyles.sectionCards}>
              {favCharacters.map((character: TCharacters) => (
                <CardCharacters
                  key={character._id}
                  authToken={cookies?.user_token}
                  character={character}
                  favorites={favCharacters}
                  favoriteChange={favoriteChange}
                  setFavoriteChange={setFavoriteChange}
                  className={commonStyles.cardContainer}
                />
              ))}
            </div>
          </div>
          <div className={`${characterStyles.portraitSection} ${commonStyles.sectionContainer}`}>
            <h4>
              Favorites comics <span>(Results : {favComics.length})</span>
            </h4>
            <div className={sectionStyles.sectionCards}>
              {favComics.length > 0 &&
                favComics.map((comic: TComic) => (
                  <CardComics
                    key={comic._id}
                    authToken={cookies?.user_token}
                    comic={comic}
                    favorites={favComics}
                    className={commonStyles.cardContainer}
                    favoriteChange={favoriteChange}
                    setFavoriteChange={setFavoriteChange}
                  />
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Favorites;
