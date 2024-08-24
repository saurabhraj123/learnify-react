// css
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.leftContainer}>
          <img src="learnify-logo.png" className={classes.logo} />
        </div>
        <div className={classes.rightContainer}>
          <a href="/login" className={classes.loginButton}>
            Log in
          </a>
          <a href="/signup" className={classes.signupButton}>
            Sign up free
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
