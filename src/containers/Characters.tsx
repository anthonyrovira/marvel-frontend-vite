import CardCharacters from "../components/CardCharacters";
import { TCharacter } from "../types";
import useCharacters from "../hooks/useCharacters";
import { FC } from "react";
import sectionStyles from "../styles/Sections.module.css";
import commonStyles from "../styles/Common.module.css";
import Pagination from "../components/Pagination";

interface ICharacter {
  search: string;
  skip: number;
  handleSkip: (event: { selected: number }, limit: number) => void;
}

const Characters: FC<ICharacter> = ({ search, skip, handleSkip }) => {
  const { count, data, isLoading, limit } = useCharacters(search, skip);

  return (
    <>
      {isLoading ? (
        <div className={commonStyles.loaderContainer}>
          <div className={commonStyles.loader} />
          <h2>Loading page...</h2>
        </div>
      ) : (
        <section className={`${commonStyles.wrapper} ${commonStyles.sectionContainer}`}>
          <div className={sectionStyles.sectionTitle}>
            <div className={sectionStyles.sectionLine} />
            <h2 className={sectionStyles.sectionText}>CHARACTERS</h2>
            <div className={sectionStyles.sectionLine} />
          </div>
          <div className={sectionStyles.sectionCards}>
            {data.map((character: TCharacter) => (
              <CardCharacters key={character._id} character={character} className={commonStyles.cardContainer} />
            ))}
          </div>

          <Pagination count={count} limit={limit} handleSkip={handleSkip} />
        </section>
      )}
    </>
  );
};

export default Characters;
