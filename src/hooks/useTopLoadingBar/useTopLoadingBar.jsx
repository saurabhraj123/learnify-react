// external
import { useEffect } from "react";
import PropTypes from "prop-types";

const useTopLoadingBar = (props) => {
  const { setTopBarProgress, type } = props;

  useEffect(() => {
    setTopBarProgress(10);

    setTimeout(() => {
      setTopBarProgress(100);
    }, 100);
  }, [type, setTopBarProgress]);

  return null;
};

useTopLoadingBar.propTypes = {
  setTopBarProgress: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default useTopLoadingBar;
