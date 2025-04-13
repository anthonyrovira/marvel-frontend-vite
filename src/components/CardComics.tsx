import { Star } from "lucide-react";
import { TComic } from "../types";
import useCardComics from "../hooks/useCardComics";
import { FC } from "react";
import styles from "./CardComics.module.css";
import commonStyles from "../styles/common.module.css";
import { useAuth } from "../contexts/AuthContext";

interface ICardComics {
  comic: TComic;
  favorites: TComic[];
  favoriteChange?: boolean;
  setFavoriteChange?: (arg: boolean) => void;
  className?: string;
}

const CardComics: FC<ICardComics> = ({ comic, favorites, favoriteChange, setFavoriteChange, className }) => {
  const { user, token } = useAuth();
  const { isFavorite, handleFavorite } = useCardComics(token, comic, favorites, favoriteChange, setFavoriteChange);

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
          <div className={`${commonStyles.favIconContainer} btn`} onClick={handleFavorite}>
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
