import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="wrapper">
        <div className={styles.footerContainer}>
          <p>
            Made with 💜 using{" "}
            <strong>
              <a href="https://github.com/facebook/create-react-app">React</a>
            </strong>{" "}
            By <a href="https://github.com/hysteria9">Anthony</a> from <a href="https://www.lereacteur.io/">Le Reacteur</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
