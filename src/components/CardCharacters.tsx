import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { TCharacters } from "../types";
import useCardCharacters from "../hooks/useCardCharacters";
import { FC } from "react";
import styles from "./CardCharacters.module.css";

interface ICardCharacters {
  character: TCharacters;
  authToken?: string;
  favorites: TCharacters[];
  favoriteChange?: boolean;
  setFavoriteChange?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardCharacters: FC<ICardCharacters> = ({ character, authToken, favorites, favoriteChange = false, setFavoriteChange }) => {
  const { handleFavorite, isFavorite } = useCardCharacters(authToken, character, favorites, favoriteChange, setFavoriteChange);

  return (
    <div className="card-container">
      <div className={styles.cardItems}>
        <Link to={`/characters/${character._id}`}>
          <div className="picture-container">
            <img
              className={styles.pictureCharacter}
              src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
              alt={character.name}
            />
          </div>
        </Link>

        {authToken && (
          <div className={`${styles.favIconContainer} btn`} onClick={handleFavorite}>
            {isFavorite ? <Star color="#d6c102" className={styles.favLogo} /> : <Star color="#fff" className={styles.favLogo} />}
          </div>
        )}

        <div className={styles.cardInfoContainer}>
          <h3>{character.name.toUpperCase()}</h3>
          <div className={styles.appearancesInfo}>
            <p>Comics :</p>
            <p>&nbsp;{character?.comics?.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCharacters;
