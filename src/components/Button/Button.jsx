// external
import PropTypes from "prop-types";
import classNames from "classnames";

// css
import classes from "./Button.module.css";

const Button = (props) => {
  const { variant = "primary", text, style, onClick = () => {} } = props;

  const buttonClass = classNames(classes.container, classes[variant]);

  return (
    <button className={buttonClass} style={style} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Button;
