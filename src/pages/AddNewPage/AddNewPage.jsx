// external
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";

// hooks
import {
  useTopLoadingBar,
  useRedirectToLoginIfNotAuthenticated,
} from "../../hooks";

// utils
import { getPayloadForMutation } from "./AddNewPageUtils";

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

  const UploadButtonComp = (props) => {
    return (
      <Button
        text="Upload"
        style={styles.submitBtn}
        variant="secondary"
        {...props}
      />
    );
  };

  const inputProps = {
    style: styles.input,
    labelProps: { style: styles.label },
  };

  const handleClickUpload = async () => {
    if (!window.showDirectoryPicker)
      return toast.error("Browser doesn't support directory picker");

    const dirHandle = await window.showDirectoryPicker();
    const payload = await getPayloadForMutation({ dirHandle, formData: {} });
    console.log({ payload });
  };

  return (
    <>
      <div className={classes.container}>
        <Sidebar />

        <div className={classes.mainSection}>
          <h1>Add Course</h1>

          <div className={classes.inputContainer}>
            <Input
              {...inputProps}
              label="Select a folder:"
              inputComp={UploadButtonComp}
              inputProps={{ onClick: handleClickUpload }}
            />
            <Input label="Title:" {...inputProps} />
            <Input label="Author:" {...inputProps} />
            <Button text="Submit" style={styles.submitBtn} />
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
};

AddNewPage.propTypes = {
  setTopBarProgress: PropTypes.func.isRequired,
};

export default AddNewPage;
