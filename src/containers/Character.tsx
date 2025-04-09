import useCharacter from "../hooks/useCharacter";
import CardComics from "../components/CardComics";
import { TComic } from "../types";
import { Star } from "lucide-react";
import styles from "./Character.module.css";

const Character = () => {
  const { cookies, dataCharacter, isLoading, handleFavoriteCharacter, isCharacterFavorite, favoritesComics } = useCharacter();

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader" />
          <h2>Loading page...</h2>
        </div>
      ) : (
        <section className="wrapper">
          {dataCharacter && (
            <>
              <h2>{dataCharacter.name.toUpperCase()}</h2>
              <div className={styles.sectionPortraitContainer}>
                <div className={styles.portraitContainer}>
                  <img
                    className={styles.portraitImage}
                    src={`${dataCharacter.thumbnail.path}/standard_fantastic.${dataCharacter.thumbnail.extension}`}
                    alt={dataCharacter.name}
                  />
                  {cookies.user_token && (
                    <div className={`${styles.favoriteBtnContainer} btn`} onClick={handleFavoriteCharacter}>
                      {isCharacterFavorite ? (
                        <Star color="#d6c102" className="fav-logo" />
                      ) : (
                        <Star color="#fff" className="fav-logo" />
                      )}
                      <p>{isCharacterFavorite ? "Delete from favorites" : "Add to favorites"}</p>
                    </div>
                  )}
                </div>

                <div className={styles.portraitComics}>
                  <div className={styles.portraitSection}>
                    <h4>Description</h4>
                    {dataCharacter.description ? (
                      <p>{dataCharacter.description}</p>
                    ) : (
                      <p>No description available for this character.</p>
                    )}
                  </div>
                  <div className={styles.portraitSection}>
                    <h4>Comics</h4>
                    <div className={styles.portraitComicsCards}>
                      {dataCharacter.comics.map((comic: TComic) => {
                        return (
                          <CardComics
                            key={comic._id}
                            comic={comic}
                            favorites={favoritesComics}
                            className={styles.portraitCardContainer}
                            authToken={cookies.user_token}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default Character;
