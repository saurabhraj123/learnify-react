// external
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// components
import { Tooltip } from "../../components";

// css
import classes from "./IconWithTooltip.module.css";

const IconWithTooltip = (props) => {
  const { icon, tooltipText, wrapInLink = true, href, onClick } = props;

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div
      className={classes.container}
      onMouseOver={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      {wrapInLink ? (
        <Link to={href}>{icon}</Link>
      ) : (
        <span onClick={onClick}>{icon}</span>
      )}
      <Tooltip text={tooltipText} isVisible={isTooltipVisible} />
    </div>
  );
};

IconWithTooltip.propTypes = {
  icon: PropTypes.node.isRequired,
  tooltipText: PropTypes.string.isRequired,
  wrapInLink: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default IconWithTooltip;
