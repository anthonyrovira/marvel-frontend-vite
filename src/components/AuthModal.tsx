import { X } from "lucide-react";
import marvel from "../assets/img/Marvel-Logo.jpg";

import { FC } from "react";
import styles from "./AuthModal.module.css";
import { useAuthModal } from "../hooks/useAuthModal";

interface IAuthModal {
  handleModalVisibility: () => void;
}

const AuthModal: FC<IAuthModal> = ({ handleModalVisibility }) => {
  const { authFormData, error, handleInputChange, handleAuthSubmit, authMode, setAuthMode } = useAuthModal({
    handleModalVisibility,
  });

  return (
    <div className={styles.modalContainer}>
      <div className={styles.centeredContainer}>
        <div className={styles.formContainer}>
          <X className={styles.closeLogo} onClick={handleModalVisibility} />

          <img src={marvel} alt="marvel logo" />
          <form
            className={styles.authFormContainer}
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAuthSubmit({
                username: formData.get("username") as string | undefined,
                email: formData.get("email") as string | undefined,
                password: formData.get("password") as string,
              });
            }}
          >
            <div className={styles.inputsFormContainer}>
              {authMode === "signup" && (
                <input
                  name="username"
                  className={error === "Username is missing" ? styles.inputModalError : styles.inputModal}
                  type="text"
                  placeholder="Username"
                  value={authFormData.username}
                  onChange={handleInputChange}
                />
              )}
              <input
                name="email"
                className={error === "Email is missing" ? styles.inputModalError : styles.inputModal}
                type="email"
                placeholder="Email"
                value={authFormData.email}
                onChange={handleInputChange}
              />
              <input
                name="password"
                className={error === "Password is missing" ? styles.inputModalError : styles.inputModal}
                type="password"
                placeholder="Password"
                value={authFormData.password}
                onChange={handleInputChange}
              />
            </div>

            {authMode === "signin" ? (
              <>
                {error !== "" && <p className={styles.signErrorMessage}>{error}</p>}
                <button type="submit" className={styles.buttonModal}>
                  Sign In
                </button>
                <p>
                  Not yet registered ?{" "}
                  <span
                    className={styles.hyperlink}
                    onClick={() => {
                      setAuthMode("signup");
                    }}
                  >
                    Sign Up now !
                  </span>
                </p>
              </>
            ) : (
              <>
                {error !== "" && <p className={styles.signErrorMessage}>{error}</p>}
                <button type="submit" className={styles.buttonModal}>
                  Sign Up
                </button>
                <p>
                  Already have an account ?{" "}
                  <span
                    className={styles.hyperlink}
                    onClick={() => {
                      setAuthMode("signin");
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
