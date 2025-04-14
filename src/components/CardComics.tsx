import { Star } from "lucide-react";
import { TComic } from "../types";
import useCardComics from "../hooks/useCardComics";
import { FC } from "react";
import styles from "./CardComics.module.css";
import commonStyles from "../styles/Common.module.css";
import { useAuth } from "../contexts/AuthContext";

interface ICardComics {
  comic: TComic;
  className?: string;
}

const CardComics: FC<ICardComics> = ({ comic, className }) => {
  const { user, token, updateUserData } = useAuth();
  const { isFavorite, handleComicFavorite } = useCardComics({ comic, user, token, updateUserData });

  return (
    <div className={className}>
      <div className={styles.cardItems}>
        <div>
          <img
            className={styles.pictureComics}
            src={`${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`}
            alt={comic.name}
          />
        </div>

        {user && (
          <div className={`${commonStyles.favIconContainer} btn`} onClick={handleComicFavorite}>
            {isFavorite ? (
              <Star color="#d6c102" className={commonStyles.favLogo} />
            ) : (
              <Star color="#fff" className={commonStyles.favLogo} />
            )}
          </div>
        )}
        <div className={styles.cardInfoContainer}>
          <h3>{comic.title.toUpperCase()}</h3>
        </div>
      </div>
    </div>
  );
};

export default CardComics;
