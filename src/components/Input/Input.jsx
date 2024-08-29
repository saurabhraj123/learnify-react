// external
import PropTypes from "prop-types";
import _ from "lodash";

// css
import classes from "./Input.module.css";

const Input = (props) => {
  const {
    label,
    type = "text",
    style,
    inputComp: InputComp,
    labelProps,
    value,
    name,
    onChange = _.noop,
    onClick = _.noop,
  } = props;

  const inputProps = {
    value,
    name,
    onClick,
    onChange,
  };

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
  value: PropTypes.any,
  name: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};

export default Input;
