// external
import PropTypes from "prop-types";

// css
import classes from "./Input.module.css";

const Input = (props) => {
  const {
    label,
    type = "text",
    style,
    inputComp: InputComp,
    labelProps,
    inputProps,
  } = props;

  return (
    <div className={classes.container} style={style}>
      <label {...labelProps}>{label}</label>
      {InputComp ? (
        <InputComp {...inputProps} />
      ) : (
        <input type={type} {...inputProps} />
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  inputComp: PropTypes.elementType,
  labelProps: PropTypes.object,
  inputProps: PropTypes.object,
};

export default Input;
