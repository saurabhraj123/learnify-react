// external
import PropTypes from "prop-types";

// internal
import { useTopLoadingBar } from "../../hooks";

// css
import classes from "./LandingPage.module.css";

const LangingPage = (props) => {
  const { setTopBarProgress } = props;

  // to show the top loading bar
  useTopLoadingBar({ setTopBarProgress });

  return <div className={classes.container}>Langing page</div>;
};

LangingPage.propTypes = {
  setTopBarProgress: PropTypes.func.isRequired,
};

export default LangingPage;
