import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import user_login from "../assets/img/user_login.png";
import user_logout from "../assets/img/user_logout.png";
import marvel from "../assets/img/Marvel-Logo.jpg";
import { ChangeEvent, FC, useState } from "react";
import AuthModal from "./AuthModal";
import styles from "./Header.module.css";
import { useAuth } from "../contexts/AuthContext";

interface IHeader {
  search: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Header: FC<IHeader> = ({ search, handleSearch }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <header className={styles.header}>
      {isModalVisible && <AuthModal handleModalVisibility={handleModalVisibility} />}
      <div className={styles.wrapper}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.headerMain}>
            <img src={marvel} alt="Marvel logo" />
          </Link>{" "}
          <input className={styles.menuBtn} type="checkbox" id="menu-btn" />
          <label className={styles.menuIcon} htmlFor="menu-btn">
            <span className={styles.navicon} />
          </label>
          <div className={styles.navbar}>
            <nav className={styles.primaryNavbar}>
              <Link to="/characters">
                <h1>CHARACTERS</h1>
              </Link>
              <Link to="/comics">
                <h1>COMICS</h1>
              </Link>
              {user ? (
                <Link to="/favorites">
                  <h1>FAVORITES</h1>
                </Link>
              ) : (
                <h1 className="btn" onClick={handleModalVisibility}>
                  FAVORITES
                </h1>
              )}
            </nav>
            <div className={styles.searchBarWrapper}>
              <div className={styles.searchBarContainer}>
                <Search className={styles.searchLogo} />
                <input type="text" placeholder="Search" className={styles.searchBar} value={search} onChange={handleSearch} />
              </div>
            </div>
            {user ? (
              <div
                className={`${styles.loginBtnContainer} btn ${styles.hidePrimary}`}
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                <img src={user_logout} alt="Login icon" />
                <p>Log Out</p>
              </div>
            ) : (
              <div className={`${styles.loginBtnContainer} btn ${styles.hidePrimary}`} onClick={handleModalVisibility}>
                <img src={user_login} alt="Login icon" />
                <p>Log In</p>
              </div>
            )}
          </div>
          <nav className={styles.secondaryNavbar}>
            <Link to="/characters">
              <h1>CHARACTERS</h1>
            </Link>
            <Link to="/comics">
              <h1>COMICS</h1>
            </Link>
            {user ? (
              <>
                <Link to="/favorites">
                  <h1>FAVORITES</h1>
                </Link>
                <div
                  className={styles.logSecondary}
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  <h1>Log Out</h1>
                </div>
              </>
            ) : (
              <>
                <h1 className="btn" onClick={handleModalVisibility}>
                  FAVORITES
                </h1>
                <div className={styles.logSecondary} onClick={handleModalVisibility}>
                  <h1>Log In</h1>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
