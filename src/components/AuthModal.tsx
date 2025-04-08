import { X } from "lucide-react";
import marvel from "../assets/img/Marvel-Logo.jpg";
import useAuthModal from "../hooks/useAuthModal";
import { FC } from "react";
import styles from "./AuthModal.module.css";

interface IAuthModal {
  handleModalVisibility: () => void;
}

const AuthModal: FC<IAuthModal> = ({ handleModalVisibility }) => {
  const { authFormData, errorMessage, greenButton, handleInputChange, handleSubmit, loginView, setLoginView } =
    useAuthModal(handleModalVisibility);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.centeredContainer}>
        <div className={styles.formContainer}>
          <X className={styles.closeLogo} onClick={handleModalVisibility} />

          <img src={marvel} alt="marvel logo" />
          <form className={styles.authFormContainer} action="" method="post" onSubmit={handleSubmit}>
            <div className={styles.inputsFormContainer}>
              {!loginView && (
                <input
                  name="username"
                  className={errorMessage === "Username is missing" ? styles.inputModalError : styles.inputModal}
                  type="text"
                  placeholder="Username"
                  value={authFormData.username}
                  onChange={handleInputChange}
                />
              )}
              <input
                name="email"
                className={errorMessage === "Email is missing" ? styles.inputModalError : styles.inputModal}
                type="email"
                placeholder="Email"
                value={authFormData.email}
                onChange={handleInputChange}
              />
              <input
                name="password"
                className={errorMessage === "Password is missing" ? styles.inputModalError : styles.inputModal}
                type="password"
                placeholder="Password"
                value={authFormData.password}
                onChange={handleInputChange}
              />
            </div>

            {loginView ? (
              <>
                {errorMessage !== "" && <p className={styles.signErrorMessage}>{errorMessage}</p>}
                <button type="submit" className={`${styles.buttonModal} ${greenButton ? styles.greenButton : ""}`}>
                  Sign In
                </button>
                <p>
                  Not yet registered ?{" "}
                  <span
                    className={styles.hyperlink}
                    onClick={() => {
                      setLoginView(!loginView);
                    }}
                  >
                    Sign Up now !
                  </span>
                </p>
              </>
            ) : (
              <>
                {errorMessage !== "" && <p className={styles.signErrorMessage}>{errorMessage}</p>}
                <button type="submit" className={`${styles.buttonModal} ${greenButton ? styles.greenButton : ""}`}>
                  Sign Up
                </button>
                <p>
                  Already have an account ?{" "}
                  <span
                    className={styles.hyperlink}
                    onClick={() => {
                      setLoginView(!loginView);
                    }}
                  >
                    Sign In
                  </span>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
