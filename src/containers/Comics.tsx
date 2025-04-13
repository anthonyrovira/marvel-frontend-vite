import { FC } from "react";
import CardComics from "../components/CardComics";
import { TComic } from "../types";
import useComics from "../hooks/useComics";
import sectionStyles from "../styles/Sections.module.css";
import commonStyles from "../styles/common.module.css";
import Pagination from "../components/Pagination";

interface IComic {
  search: string;
  skip: number;
  handleSkip: (e: { selected: number }, limit: number) => void;
}

const Comics: FC<IComic> = ({ search, skip, handleSkip }) => {
  const { comicData, isLoading, count, favoritesComics, limit } = useComics(search, skip);

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
            <h2 className={sectionStyles.sectionText}>COMICS</h2>
            <div className={sectionStyles.sectionLine} />
          </div>

          <div className={sectionStyles.sectionCards}>
            {comicData.map((comic: TComic) => (
              <CardComics key={comic._id} comic={comic} favorites={favoritesComics} className={commonStyles.cardContainer} />
            ))}
          </div>

          <Pagination count={count} limit={limit} handleSkip={handleSkip} />
        </section>
      )}
    </>
  );
};

export default Comics;
