// external
import PropTypes from "prop-types";

// hooks
import { useTopLoadingBar } from "../../hooks";

// components
import { LandingPageLayout } from "../../components";

// css
import classes from "./LandingPage.module.css";

const LangingPage = (props) => {
  const { setTopBarProgress } = props;

  // to show the top loading bar
  useTopLoadingBar({ setTopBarProgress });

  return (
    <LandingPageLayout>
      <div className={classes.container}>Langing page</div>
    </LandingPageLayout>
  );
};

LangingPage.propTypes = {
  setTopBarProgress: PropTypes.func.isRequired,
};

export default LangingPage;
