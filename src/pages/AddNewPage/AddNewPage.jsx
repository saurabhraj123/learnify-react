// external
import PropTypes from "prop-types";

// hooks
import {
  useTopLoadingBar,
  useRedirectToLoginIfNotAuthenticated,
} from "../../hooks";

// components
import { Sidebar } from "../../components";

// css
import classes from "./AddNewPage.module.css";

const AddNewPage = (props) => {
  const { setTopBarProgress } = props;

  // redirect to login if un-authenticated
  useRedirectToLoginIfNotAuthenticated();

  // to show the top loading bar
  useTopLoadingBar({ setTopBarProgress });

  return (
    <div className={classes.container}>
      <Sidebar />
    </div>
  );
};

AddNewPage.propTypes = {
  setTopBarProgress: PropTypes.func.isRequired,
};

export default AddNewPage;
