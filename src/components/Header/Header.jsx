// external
import { Link } from "react-router-dom";

// css
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.leftContainer}>
          <Link to="/">
            <img src="learnify-logo.png" className={classes.logo} />
          </Link>
        </div>
        <div className={classes.rightContainer}>
          <Link to="/signup" className={classes.loginButton}>
            Contact
          </Link>
          <Link to="/login" className={classes.signupButton}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
