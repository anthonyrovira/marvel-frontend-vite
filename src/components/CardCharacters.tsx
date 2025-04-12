import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { TCharacters } from "../types";
import useCardCharacters from "../hooks/useCardCharacters";
import { FC } from "react";
import styles from "./CardCharacters.module.css";
import commonStyles from "../styles/common.module.css";

interface ICardCharacters {
  character: TCharacters;
  favorites: { _id: string }[];
  favoriteChange?: boolean;
  setFavoriteChange?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const CardCharacters: FC<ICardCharacters> = ({ character, favorites, favoriteChange = false, setFavoriteChange, className }) => {
  const { handleFavorite, isFavorite, user } = useCardCharacters(character, favorites, favoriteChange, setFavoriteChange);
  console.log({ handleFavorite, isFavorite, user, character, favorites, favoriteChange });

  return (
    <div className={className}>
      <div className={styles.cardItems}>
        <Link to={`/characters/${character._id}`}>
          <div>
            <img
              className={styles.pictureCharacter}
              src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
              alt={character.name}
            />
          </div>
        </Link>

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
