// internal
import PropTypes from "prop-types";

// internal
import { useTopLoadingBar } from "../hooks";

const AuthPage = (props) => {
  const { setTopBarProgress, type } = props;

  // to show the top loading bar
  useTopLoadingBar({ setTopBarProgress, type });

  return <div>{type === "LOGIN" ? "Log in page" : "Sign up page"}</div>;
};

AuthPage.propTypes = {
  setTopBarProgress: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default AuthPage;
