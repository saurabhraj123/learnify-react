// external
import PropTypes from "prop-types";

// css
import classNames from "classnames";
import classes from "./Tooltip.module.css";

const Tooltip = ({ text, isVisible }) => {
  return (
    <div
      className={classNames(classes.tooltip, { [classes.visible]: isVisible })}
    >
      {text}
    </div>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Tooltip;
