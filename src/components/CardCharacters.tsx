import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { TCharacter } from "../types";
import useCardCharacters from "../hooks/useCardCharacters";
import { FC } from "react";
import styles from "./CardCharacters.module.css";
import commonStyles from "../styles/Common.module.css";
import { useAuth } from "../contexts/AuthContext";

interface ICardCharacters {
  character: TCharacter;
  className?: string;
}

const CardCharacters: FC<ICardCharacters> = ({ character, className }) => {
  const { user, token, updateUserData } = useAuth();
  const { handleFavorite, isFavorite } = useCardCharacters({ character, user, token, updateUserData });

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
          <button type="button" className={commonStyles.favIconContainer} onClick={handleFavorite}>
            {isFavorite ? (
              <Star color="#d6c102" className={commonStyles.favLogo} />
            ) : (
              <Star color="#fff" className={commonStyles.favLogo} />
            )}
          </button>
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
