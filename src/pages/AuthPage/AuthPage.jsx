// external
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

// internal
import { useTopLoadingBar } from "../../hooks";

// css
import classes from "./AuthPage.module.css";

const AuthPage = (props) => {
  const { setTopBarProgress, type } = props;

  const { loginWithRedirect } = useAuth0();

  // to show the top loading bar
  useTopLoadingBar({ setTopBarProgress, type });

  const headingLabel =
    type === "LOGIN"
      ? "Sign in with Google to continue"
      : "Create an account to continue";

  return (
    <div className={classes.container}>
      <div className={classes.authContainer}>
        <h3 className={classes.heading}>{headingLabel}</h3>
        <button
          className={classes.googleButton}
          onClick={() => {
            loginWithRedirect({
              authorizationParams: {
                connection: "google-oauth2",
              },
            });
          }}
        >
          <img
            src="/google.png"
            className={classes.googleIcon}
            alt="Google logo"
          />
          Sign {type === "LOGIN" ? "in" : "up"} with Google
        </button>
      </div>
    </div>
  );
};

AuthPage.propTypes = {
  setTopBarProgress: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default AuthPage;
