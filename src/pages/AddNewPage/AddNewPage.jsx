// external
import PropTypes from "prop-types";

// hooks
import {
  useTopLoadingBar,
  useRedirectToLoginIfNotAuthenticated,
} from "../../hooks";

// components
import { Sidebar, Input, Button } from "../../components";

// css
import classes from "./AddNewPage.module.css";

const styles = {
  input: {
    marginLeft: 10,
  },
  label: {
    width: 116,
  },
  submitBtn: {
    marginLeft: 8,
  },
};

const AddNewPage = (props) => {
  const { setTopBarProgress } = props;

  // redirect to login if un-authenticated
  useRedirectToLoginIfNotAuthenticated();

  // to show the top loading bar
  useTopLoadingBar({ setTopBarProgress });

  const UploadButtonComp = () => {
    return (
      <Button text="Upload" style={styles.submitBtn} variant="secondary" />
    );
  };

  const inputProps = {
    style: styles.input,
    labelProps: { style: styles.label },
  };

  return (
    <div className={classes.container}>
      <Sidebar />

      <div className={classes.mainSection}>
        <h1>Add Course</h1>

        <div className={classes.inputContainer}>
          <Input
            {...inputProps}
            label="Select a folder:"
            inputComp={<UploadButtonComp />}
          />
          <Input label="Title:" {...inputProps} />
          <Input label="Author:" {...inputProps} />
          <Button text="Submit" style={styles.submitBtn} />
        </div>
      </div>
    </div>
  );
};

AddNewPage.propTypes = {
  setTopBarProgress: PropTypes.func.isRequired,
};

export default AddNewPage;
