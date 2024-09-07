// external
import _ from "lodash";
import { useState, useMemo } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

// hooks
import {
  useTopLoadingBar,
  useRedirectToLoginIfNotAuthenticated,
} from "../../hooks";

// utils
import { getPayloadForMutation } from "./AddNewPageUtils";
import { apiClient } from "/src//utils/axios";

// components
import { Sidebar, Input, Button, Accordion } from "../../components";

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

  const { user } = useAuth0();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // redirect to login if un-authenticated
  useRedirectToLoginIfNotAuthenticated();

  // to show the top loading bar
  useTopLoadingBar({ setTopBarProgress });

  const [formData, setFormData] = useState({
    title: "",
    author: "",
  });
  const [payload, setPayload] = useState(null);
  const [isPayloadProcessing, setIsPayloadProcessing] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFolderSelection = async () => {
    if (!window.showDirectoryPicker)
      return toast.error("Browser doesn't support directory picker");

    try {
      const dirHandle = await window.showDirectoryPicker();

      const courseTitle = dirHandle.name;
      const courseData = { title: courseTitle, author: formData.author };
      handleInputChange({ target: { name: "title", value: courseTitle } });

      setPayload(null);
      setIsPayloadProcessing(true);
      const payload = await getPayloadForMutation({
        dirHandle,
        formData: courseData,
      });
      setPayload(payload);
      setIsPayloadProcessing(false);
    } catch (err) {
      setIsPayloadProcessing(false);
      if (err.code === 20) return; // user aborts the request
      toast.error("Error selecting directory.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (_.isEmpty(payload)) return;
    try {
      setIsSubmitting(true);
      const { data } = await apiClient.post(`/api/courses`, {
        ...payload,
        email: user.email,
        author: formData.author,
      });
      console.log({ data });
      setIsSubmitting(false);
      toast.success("Course added successfully.");
    } catch (e) {
      setIsSubmitting(false);
      toast.error("Error submitting course.");
    }
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

  const courseSections = useMemo(() => {
    if (!payload) return [];

    return _.map(payload.sections, (section) => ({
      title: section.title,
      videos: _.map(section.files, (video) => ({
        title: video.title,
      })),
    }));
  }, [payload]);

  const accordionSectionClasses = classNames({
    [classes.accordionSection]: true,
    [classes.accordionEmptyMessage]: _.isEmpty(courseSections),
  });

  return (
    <>
      <div className={classes.container}>
        <Sidebar />
        <div className={classes.mainSection}>
          <div className={classes.formSection}>
            <h1>Add Course</h1>
            <form className={classes.inputContainer} onSubmit={handleSubmit}>
              <Input
                {...inputProps}
                label="Select a folder:"
                inputComp={UploadButtonComp}
                onClick={handleFolderSelection}
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
              <Button
                type="submit"
                text={isSubmitting ? "Submitting..." : "Submit"}
                style={styles.submitBtn}
                disabled={isSubmitting}
              />
            </form>
          </div>
          <div className={accordionSectionClasses}>
            {!_.isEmpty(courseSections) ? (
              <>
                <div className={classes.accordionContainer}>
                  <div className={classes.sectionTitle}>{formData?.title}</div>
                  <Accordion sections={courseSections} />
                </div>
              </>
            ) : isPayloadProcessing ? (
              <CircularProgress />
            ) : (
              <div>Select a folder to learnify it</div>
            )}
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
