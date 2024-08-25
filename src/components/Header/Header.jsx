// external
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// internal
import SkeletonLoader from "../SkeletonLoader";

// css
import classes from "./Header.module.css";

const Header = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const renderAuthLinks = () => {
    if (isLoading) {
      return <SkeletonLoader width={100} height={30} />;
    }

    if (!isAuthenticated) {
      return (
        <>
          <Link to="/signup" className={classes.loginButton}>
            Contact
          </Link>
          <Link to="/login" className={classes.signupButton}>
            Log in
          </Link>
        </>
      );
    }

    return (
      <Link to="/login" className={classes.signupButton}>
        Dashboard
      </Link>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.leftContainer}>
          <Link to="/">
            <img
              src="learnify-logo.png"
              className={classes.logo}
              alt="Learnify Logo"
            />
          </Link>
        </div>
        <div className={classes.rightContainer}>{renderAuthLinks()}</div>
      </div>
    </div>
  );
};

export default Header;
