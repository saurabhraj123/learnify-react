// external
import { useState } from "react";
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

  const [formData, setFormData] = useState({
    title: "",
    author: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickUpload = async () => {
    if (!window.showDirectoryPicker)
      return toast.error("Browser doesn't support directory picker");

    try {
      const dirHandle = await window.showDirectoryPicker();

      const courseTitle = dirHandle.name;
      const courseData = { title: courseTitle, author: formData.author };
      handleInputChange({ target: { name: "title", value: courseTitle } });

      const payload = await getPayloadForMutation({
        dirHandle,
        formData: courseData,
      });
      console.log({ payload });
    } catch (err) {
      if (err.code === 20) return; // user aborts the request
      toast.error("Error selecting directory.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Process form submission
    console.log("Submitting form data:", formData);
    // Implement further submission logic here
  };

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

  return (
    <>
      <div className={classes.container}>
        <Sidebar />

        <div className={classes.mainSection}>
          <h1>Add Course</h1>

          <form className={classes.inputContainer} onSubmit={handleSubmit}>
            <Input
              {...inputProps}
              label="Select a folder:"
              inputComp={UploadButtonComp}
              onClick={handleClickUpload}
            />
            <Input
              {...inputProps}
              label="Title:"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <Input
              {...inputProps}
              label="Author:"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
            />
            <Button type="submit" text="Submit" style={styles.submitBtn} />
          </form>
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
