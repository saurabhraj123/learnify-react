// internal
import PropTypes from "prop-types";

// internal
import { useTopLoadingBar } from "../../hooks";

// css
import classes from "./AuthPage.module.css";

const AuthPage = (props) => {
  const { setTopBarProgress, type } = props;

  // to show the top loading bar
  useTopLoadingBar({ setTopBarProgress, type });

  return (
    <div className={classes.container}>
      {type === "LOGIN" ? "Log in page" : "Sign up page"}
    </div>
  );
};

AuthPage.propTypes = {
  setTopBarProgress: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default AuthPage;
