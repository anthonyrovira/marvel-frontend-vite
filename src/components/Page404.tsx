import styles from "./Page404.module.css";

const Page404 = () => {
  return (
    <div className={styles.error404Container}>
      <p className={styles.error404Title}>ERROR - PAGE NOT FOUND</p>
      <p className={styles.error404Message}>The page you are trying to access doesn't appear to exist.</p>
    </div>
  );
};

export default Page404;
