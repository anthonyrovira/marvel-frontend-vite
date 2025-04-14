import useCharacter from "../hooks/useCharacter";
import CardComics from "../components/CardComics";
import { TComic } from "../types";
import { Star } from "lucide-react";
import styles from "./Character.module.css";
import commonStyles from "../styles/common.module.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Character = () => {
  const { characterId } = useParams();
  const { token, user, updateUserData } = useAuth();
  const { dataCharacter, isLoading, handleFavoriteCharacter, isCharacterFavorite } = useCharacter({
    characterId,
    user,
    token,
    updateUserData,
  });

  return (
    <>
      {isLoading ? (
        <div className={commonStyles.loaderContainer}>
          <div className={commonStyles.loader} />
          <h2>Loading page...</h2>
        </div>
      ) : (
        <section className={commonStyles.wrapper}>
          {dataCharacter && (
            <>
              <h2 className={commonStyles.characterName}>{dataCharacter.name.toUpperCase()}</h2>
              <div className={styles.sectionPortraitContainer}>
                <div className={styles.portraitContainer}>
                  <img
                    className={styles.portraitImage}
                    src={`${dataCharacter.thumbnail.path}/standard_fantastic.${dataCharacter.thumbnail.extension}`}
                    alt={dataCharacter.name}
                  />
                  {user && (
                    <div className={`${styles.favoriteBtnContainer} btn`} onClick={handleFavoriteCharacter}>
                      {isCharacterFavorite ? (
                        <Star color="#d6c102" className={commonStyles.favLogo} />
                      ) : (
                        <Star color="#fff" className={commonStyles.favLogo} />
                      )}
                      <p>&nbsp;{isCharacterFavorite ? "Delete from favorites" : "Add to favorites"}</p>
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
                        return <CardComics key={comic._id} comic={comic} className={styles.portraitCardContainer} />;
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
