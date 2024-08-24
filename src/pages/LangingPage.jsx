// external
import PropTypes from "prop-types";

// internal
import { useTopLoadingBar } from "../hooks";

const LangingPage = (props) => {
  const { setTopBarProgress } = props;

  // to show the top loading bar
  useTopLoadingBar({ setTopBarProgress });

  return <div>Langing page</div>;
};

LangingPage.propTypes = {
  setTopBarProgress: PropTypes.func.isRequired,
};

export default LangingPage;
