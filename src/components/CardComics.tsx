import { Star } from "lucide-react";
import { TComic } from "../types";
import useCardComics from "../hooks/useCardComics";
import { FC } from "react";
import styles from "./CardComics.module.css";

interface ICardComics {
  comic: TComic;
  authToken?: string | undefined;
  favorites: TComic[];
  favoriteChange?: boolean;
  setFavoriteChange?: (arg: boolean) => void;
  className?: string;
}

const CardComics: FC<ICardComics> = ({ authToken, comic, favorites, favoriteChange, setFavoriteChange, className }) => {
  const { isFavorite, handleFavorite } = useCardComics(authToken, comic, favorites, favoriteChange, setFavoriteChange);

  return (
    <div className={className}>
      <div className={styles.cardItems}>
        <div className="picture-container">
          <img
            className={styles.pictureComics}
            src={`${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`}
            alt={comic.name}
          />
        </div>

        {authToken && (
          <div className={`${styles.favIconContainer} btn`} onClick={handleFavorite}>
            {isFavorite ? <Star color="#d6c102" className={styles.favLogo} /> : <Star color="#fff" className={styles.favLogo} />}
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
